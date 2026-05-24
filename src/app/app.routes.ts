import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

/**
 * Table du routage : « quelle URL affiche quel composant ? ».
 *
 * - Routes publiques : login + register ; tout le monde y accède.
 * - /home passe par canActivate: [authGuard] → petite barrière avant d'afficher le composant.
 * - "**" ramène tout URL fantaisiste vers login pour ne pas avoir de page vide.
 */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
