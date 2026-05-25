import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { GameDetailComponent } from './game-detail.component';
import { FavoriteService } from '../../core/services/favorite.service';
import { GameService } from '../../core/services/game.service';
import { HistoryService } from '../../core/services/history.service';
import { Game } from '../../core/models/game.model';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isFavorite to true when the current game is in the favorites list', () => {
    const gameService = TestBed.inject(GameService);
    const favoriteService = TestBed.inject(FavoriteService);
    const historyService = TestBed.inject(HistoryService);

    const mockGame: Game = { id: 1, title: 'Test Game', isFeatured: false };
    vi.spyOn(gameService, 'getGameById').mockReturnValue(of(mockGame));
    vi.spyOn(favoriteService, 'getFavorites').mockReturnValue(of([mockGame]));
    vi.spyOn(historyService, 'addToHistory').mockReturnValue(of(null));

    component.ngOnInit();

    expect(component.isFavorite).toBe(true);
  });
});
