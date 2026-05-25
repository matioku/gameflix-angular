import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { Game } from '../models/game.model';
import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/favorites`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(FavoriteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getFavorites() envoie GET /favorites et retourne Game[]', () => {
    const mock: Game[] = [{ id: 1, title: 'A', isFeatured: false }];
    service.getFavorites().subscribe(g => expect(g).toEqual(mock));
    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('addFavorite(5) envoie POST /favorites/5 avec corps {}', () => {
    service.addFavorite(5).subscribe();
    const req = httpMock.expectOne(`${base}/5`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ message: 'ok' });
  });

  it('removeFavorite(5) envoie DELETE /favorites/5', () => {
    service.removeFavorite(5).subscribe();
    const req = httpMock.expectOne(`${base}/5`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
