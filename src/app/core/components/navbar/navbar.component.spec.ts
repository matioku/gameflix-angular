import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            logout: vi.fn(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    authService = TestBed.inject(AuthService);
    await fixture.whenStable();
  });

  it('affiche le logo "GameFlix" avec un lien vers /games', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo).toBeTruthy();
    expect(logo?.nativeElement.textContent.trim()).toBe('GameFlix');
  });

  it('affiche un lien "Catalogue"', () => {
    const link = fixture.debugElement
      .queryAll(By.css('.links a'))
      .find(el => el.nativeElement.textContent.trim() === 'Catalogue');
    expect(link).toBeTruthy();
  });

  it('affiche un lien "Favoris"', () => {
    const link = fixture.debugElement
      .queryAll(By.css('.links a'))
      .find(el => el.nativeElement.textContent.trim() === 'Favoris');
    expect(link).toBeTruthy();
  });

  it('affiche un lien "Historique"', () => {
    const link = fixture.debugElement
      .queryAll(By.css('.links a'))
      .find(el => el.nativeElement.textContent.trim() === 'Historique');
    expect(link).toBeTruthy();
  });

  it('appelle authService.logout() au clic sur "Déconnexion"', () => {
    const btn = fixture.debugElement.query(By.css('.logout-btn'));
    expect(btn).toBeTruthy();
    btn.triggerEventHandler('click', {});
    expect(authService.logout).toHaveBeenCalledTimes(1);
  });
});
