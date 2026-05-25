import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class FavoriteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/favorites`;

  getFavorites(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  addFavorite(gameId: number): Observable<unknown> {
    return this.http.post<unknown>(`${this.apiUrl}/${gameId}`, {});
  }

  removeFavorite(gameId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${gameId}`);
  }
}
