import { Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { NavbarComponent } from './core/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class App {
  private readonly router = inject(Router);

  private readonly PUBLIC_ROUTES = ['/login', '/register'];

  private readonly navEnd = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ),
    { initialValue: { urlAfterRedirects: this.router.url } as NavigationEnd }
  );

  showNavbar = computed(() => {
    const url = this.navEnd().urlAfterRedirects;
    return !this.PUBLIC_ROUTES.some(r => url.startsWith(r));
  });
}
