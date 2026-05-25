import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { App } from './app.component';

@Component({ standalone: true, template: '' })
class StubPage {}

describe('App (AppComponent)', () => {
  let fixture: ComponentFixture<App>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([
          { path: 'login', component: StubPage },
          { path: 'register', component: StubPage },
          { path: 'games', component: StubPage },
          { path: 'favorites', component: StubPage },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(App);
  });

  it('masque la navbar sur /login', async () => {
    await router.navigate(['/login']);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-navbar'))).toBeNull();
  });

  it('masque la navbar sur /register', async () => {
    await router.navigate(['/register']);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-navbar'))).toBeNull();
  });

  it('affiche la navbar sur /games', async () => {
    await router.navigate(['/games']);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-navbar'))).toBeTruthy();
  });

  it('affiche la navbar sur /favorites', async () => {
    await router.navigate(['/favorites']);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('app-navbar'))).toBeTruthy();
  });
});
