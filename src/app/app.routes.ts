import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { GameDetail } from './pages/game-detail/game-detail.component';
import { GamesComponent } from './pages/games/games.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { HistoryComponent } from './pages/history/history.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'games', component: GamesComponent, canActivate: [authGuard] },
  { path: 'games/:id', component: GameDetail, canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' },
];
