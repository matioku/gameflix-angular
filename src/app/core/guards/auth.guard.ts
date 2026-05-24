import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';

/**
 * Garde utilisée dans app.routes.ts sur la route /home (et plus tard tout ce qui est privé).
 *
 * Fonctionnement classique Angular :
 * - tu essaies d'aller sur /home
 * - avant d'afficher la page, le routeur déclenche ce guard
 * - si pas de token (isLoggedIn() faux) → redirection vers login
 * - sinon tu laisses passer (true)
 *
 * Ça évite qu'un utilisateur tape /home dans la barre d'URL sans avoir jamais connecté.
 */

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true;
  }

  return router.parseUrl('/login');
};
