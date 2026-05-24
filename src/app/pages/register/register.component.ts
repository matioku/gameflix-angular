import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';
import type { RegisterResponse } from '../../core/models/auth.types';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  email = '';
  password = '';
  errorMsg = '';

  /**
   * Inscription puis navigation :
   * - Si un jour ton API ajoute aussi un jwt dans register, on saute directement au home ;
   *   pour l'instant elle renvoie seulement { message, user } → alors on envoie l'élève
   *   sur /login avec un petit hint (?registered=1) qui affiche une phrase sympathique sur la vue login.
   */
  submit(): void {
    this.errorMsg = '';

    this.auth
      .register({
        username: this.username.trim(),
        email: this.email.trim(),
        password: this.password,
      })
      .subscribe({
        next: (res: RegisterResponse & { token?: string }) => {
          if (res.token) {
            /* Cas rare mais prêt pour un backend qui renverrait aussi un token à l'inscription */

            this.auth.saveToken(res.token);
            void this.router.navigate(['/home']);
          } else {
            void this.router.navigate(['/login'], {
              queryParams: { registered: '1' },
            });
          }
        },

        error: () => {
          this.errorMsg =
            'Impossible de créer le compte (email/username déjà pris ou erreur réseau).';
        },
      });
  }
}
