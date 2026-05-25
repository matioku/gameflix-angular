import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Game } from '../../core/models/game.model';
import { FavoriteService } from '../../core/services/favorite.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  private readonly favoriteService = inject(FavoriteService);

  games: Game[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.favoriteService.getFavorites().subscribe({
      next: games => {
        this.games = games;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les favoris.';
        this.loading = false;
      },
    });
  }

  remove(gameId: number): void {
    this.favoriteService.removeFavorite(gameId).subscribe({
      next: () => {
        this.games = this.games.filter(g => g.id !== gameId);
      },
    });
  }

  getRating(game: Game): string {
    if (game.rating == null) return '—';
    return parseFloat(String(game.rating)).toFixed(1);
  }
}
