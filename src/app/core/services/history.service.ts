import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { History } from '../models/history.model';

@Injectable({ providedIn: 'root' })
export class HistoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/history`;

  getHistory(): Observable<History[]> {
    return this.http.get<History[]>(this.apiUrl);
  }

  addToHistory(gameId: number): Observable<unknown> {
    return this.http.post<unknown>(`${this.apiUrl}/${gameId}`, {});
  }
}
