import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Game } from '../models/game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/games`;

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getFeaturedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?featured=true`);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  searchGames(search: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?search=${search}`);
  }

  getGamesByGenre(genre: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}?genre=${genre}`);
  }
}
