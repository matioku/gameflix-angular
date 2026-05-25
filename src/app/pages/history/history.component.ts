import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { History } from '../../core/models/history.model';
import { HistoryService } from '../../core/services/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent implements OnInit {
  private readonly historyService = inject(HistoryService);

  entries: History[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.historyService.getHistory().subscribe({
      next: entries => {
        this.entries = entries;
        this.loading = false;
      },
      error: () => {
        this.error = "Impossible de charger l'historique.";
        this.loading = false;
      },
    });
  }
}
