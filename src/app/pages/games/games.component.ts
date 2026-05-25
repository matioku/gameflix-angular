import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Game } from '../../core/models/game.model';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css',
})
export class GamesComponent implements OnInit {
  private readonly gameService = inject(GameService);

  games: Game[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.gameService.getGames().subscribe({
      next: games => {
        this.games = games;
        this.loading = false;
      },
      error: () => {
        this.error = 'Impossible de charger les jeux.';
        this.loading = false;
      },
    });
  }

  getRating(game: Game): string {
    if (game.rating == null) return '—';
    return parseFloat(String(game.rating)).toFixed(1);
  }
}
