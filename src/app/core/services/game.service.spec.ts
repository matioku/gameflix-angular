import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { Game } from '../models/game.model';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;
  const base = `${environment.apiUrl}/games`;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => expect(service).toBeTruthy());

  it('getGames() envoie GET /games', () => {
    const mock: Game[] = [{ id: 1, title: 'A', isFeatured: false }];
    service.getGames().subscribe(g => expect(g).toEqual(mock));
    const req = httpMock.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getFeaturedGames() envoie GET /games?featured=true', () => {
    const mock: Game[] = [{ id: 2, title: 'B', isFeatured: true }];
    service.getFeaturedGames().subscribe(g => expect(g).toEqual(mock));
    const req = httpMock.expectOne(`${base}?featured=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('getGameById(3) envoie GET /games/3', () => {
    const mock: Game = { id: 3, title: 'C', isFeatured: false };
    service.getGameById(3).subscribe(g => expect(g).toEqual(mock));
    const req = httpMock.expectOne(`${base}/3`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('searchGames() envoie GET /games?search=zelda', () => {
    service.searchGames('zelda').subscribe();
    const req = httpMock.expectOne(`${base}?search=zelda`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('getGamesByGenre() envoie GET /games?genre=RPG', () => {
    service.getGamesByGenre('RPG').subscribe();
    const req = httpMock.expectOne(`${base}?genre=RPG`);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
