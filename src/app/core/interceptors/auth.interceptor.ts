import { HttpInterceptorFn } from '@angular/common/http';

import { AUTH_TOKEN_STORAGE_KEY } from '../constants/auth-storage';

/**
 * Petite fonction « passe-partout » exécutée avant chaque requête HTTP sortante :
 * si un token existe en localStorage, on recopie automatiquement
 * Authorization: Bearer <token>
 *
 * À quoi ça sert ?
 * Sinon il faudrait écrire à la main headers: { Authorization: ... } dans chaque appel,
 * comme getMe() ou plus tard tes appels aux jeux. L'intercepteur centralise tout ça.
 *
 * Pourquoi on ne fait pas inject(AuthService) ici ?
 * Sinon HttpClient peut dépendre d'AuthService, et AuthService utilise HttpClient — boucle désagréable.
 * Ducoup on lit le token directement avec la même clef locale que dans AuthService.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  /* Pas encore connecté : on laisse la requerche partir telle quelle (login/register par ex.) */

  if (!token) {
    return next(req);
  }

  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
