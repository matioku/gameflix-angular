import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { History } from '../models/history.model';
import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/history`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(HistoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getHistory() envoie GET /history', () => {
    const mock: History[] = [{ viewedAt: '2026-01-01T10:00:00Z', game: { id: 1, title: 'A', isFeatured: false } }];
    service.getHistory().subscribe(h => expect(h).toEqual(mock));
    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('addToHistory(7) envoie POST /history/7 avec corps {}', () => {
    service.addToHistory(7).subscribe();
    const req = httpMock.expectOne(`${base}/7`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ message: 'ok' });
  });
});
