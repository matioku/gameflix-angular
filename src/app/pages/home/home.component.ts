import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import type { User } from '../../core/models/auth.types';

/**
 * Page très simple après login : elle sert uniquement à prouver que le front dialogue bien avec /auth/me.
 * Le guard sur la route /home garantit qu'on a un token avant d'arriver ici.
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private readonly auth = inject(AuthService);

  user: User | null = null;
  meError = '';
  loadingMe = true;

  ngOnInit(): void {
    /**
     * getMe() part en GET /auth/me : l'intercepteur ajoute Bearer tout seul.
     * C'est LE test intégration élève/amphi : sans token invalide cette requête côté back.
     */
    this.auth.getMe().subscribe({
      next: ({ user }) => {
        this.user = user;
        this.loadingMe = false;
      },

      error: () => {
        this.loadingMe = false;
        this.meError = 'Impossible de récupérer le profil (/me).';
      },
    });
  }

  logout(): void {
    /* Délégation au service : il nettoie le storage + redirige sur /login */

    this.auth.logout();
  }
}
