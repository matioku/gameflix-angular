import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

/**
 * Fichiers de bootstrap Angular standalone : liste des briques disponibles dans toute l'app.
 *
 * - HttpClient permet d'utiliser AuthService.login() etc.
 * - withInterceptors([authInterceptor]) branche automatiquement le JWT sur tes requêtes.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
