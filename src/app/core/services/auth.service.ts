import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AUTH_TOKEN_STORAGE_KEY } from '../constants/auth-storage';
import type {
  LoginPayload,
  LoginResponse,
  MeResponse,
  RegisterPayload,
  RegisterResponse,
  User,
} from '../models/auth.types';

/**
 * Service central pour parler avec le backend sur tout ce qui est « qui es-tu ? ».
 *
 * En pratique :
 * - register → « crée-moi un compte » (pas forcément connecté tout de suite selon le back)
 * - login → récupérer un token JWT qu'on gardera ensuite
 * - getMe → « vérifie mon token et dis-moi qui je suis »
 *
 * Le token est gardé dans le localStorage du navigateur : tant qu'il est là, Angular peut
 * l'envoyer avec chaque requête HTTP si on branche bien un intercepteur (voir fichier auth.interceptor).
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  /** Préfixe commun aux routes auth : combine environment.apiUrl + "/auth" */
  private readonly authBase = `${environment.apiUrl}/auth`;

  register(data: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authBase}/register`, data);
  }

  login(data: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.authBase}/login`, data);
  }

  /** Appelle le backend avec le JWT (via l'intercepteur) pour avoir le profil à jour */

  getMe(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.authBase}/me`);
  }

  saveToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  }

  /**
   * À appeler après un login réussi : on enregistre le JWT une bonne fois,
   * et on peut utiliser les infos utilisateur renvoyées pour l'interface.
   */
  bootstrapSessionFromLogin(response: LoginResponse): User {
    this.saveToken(response.token);
    return response.user;
  }

  /** Déconnexion = on efface le jeton puis on ramène l'utilisateur sur la page login */

  logout(): void {
    localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    void this.router.navigate(['/login']);
  }

  /** Très rudimentaire : « est-ce qu'on a une chaîne non vide dans localStorage ? » */

  isLoggedIn(): boolean {
    const t = this.getToken();
    return typeof t === 'string' && t.length > 0;
  }
}
