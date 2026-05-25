import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Game } from '../../core/models/game.model';
import { FavoriteService } from '../../core/services/favorite.service';
import { GameService } from '../../core/services/game.service';
import { HistoryService } from '../../core/services/history.service';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.css',
})
export class GameDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly gameService = inject(GameService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly historyService = inject(HistoryService);

  game: Game | null = null;
  loading = true;
  error: string | null = null;
  isFavorite = false;
  favoriteLoading = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(id).subscribe({
      next: game => {
        this.game = game;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger ce jeu.';
        this.loading = false;
      },
    });

    this.historyService.addToHistory(id).subscribe();

    this.favoriteService.getFavorites().subscribe({
      next: favorites => {
        this.isFavorite = favorites.some(f => f.id === id);
      },
    });
  }

  toggleFavorite(): void {
    if (!this.game) return;
    this.favoriteLoading = true;
    const action = this.isFavorite
      ? this.favoriteService.removeFavorite(this.game.id)
      : this.favoriteService.addFavorite(this.game.id);

    action.subscribe({
      next: () => {
        this.isFavorite = !this.isFavorite;
        this.favoriteLoading = false;
      },
      error: () => {
        this.favoriteLoading = false;
      },
    });
  }

  isVideoUrl(url: string): boolean {
    return /\.(mp4|webm)$/i.test(url);
  }

  getRating(game: Game): string {
    if (game.rating == null) return '—';
    return parseFloat(String(game.rating)).toFixed(1);
  }
}
