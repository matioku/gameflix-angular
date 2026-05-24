import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  email = '';
  password = '';
  errorMsg = '';

  /** Si on arrive depuis /register avec ?registered=1, on peut afficher un petit encouragement */

  registeredMsg = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === '1') {
        this.registeredMsg =
          'Compte créé. Connecte-toi avec ton email et ton mot de passe.';
      }
    });
  }

  /**
   * Clic « Se connecter » :
   * 1. appelle le backend (/auth/login)
   * 2. si OK → sauvegarder le JWT + naviguer vers /home
   * 3. si erreur HTTP → afficher message simple sans exposer tous les détails techniques
   */
  submit(): void {
    this.errorMsg = '';

    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: (res) => {
        this.auth.bootstrapSessionFromLogin(res);
        void this.router.navigate(['/home']);
      },

      error: () => {
        this.errorMsg = 'Identifiants incorrects ou erreur serveur.';
      },
    });
  }
}
