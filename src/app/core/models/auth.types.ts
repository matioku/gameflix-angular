/** Forme grossière de ce que le backend nous renvoie pour un utilisateur (sans mot de passe). */

export interface User {
  id: number;
  username: string;
  email: string;
  avatar: string | null;
  createdAt?: string;
  updatedAt?: string;
}

/** Réponse de POST /auth/login — c'est là qu'on reçoit le fameux JWT + les infos utilisateur */

export interface LoginResponse {
  token: string;
  user: User;
}

/** Réponse de POST /auth/register — avec notre API actuelle il n'y a souvent PAS de token, juste « compte créé » */

export interface RegisterResponse {
  message: string;
  user: User;
}

/** Réponse de GET /auth/me — le backend groupe l'utilisateur sous la clef « user » */

export interface MeResponse {
  user: User;
}

/** Ce qu'on envoie dans le corps JSON pour créer un compte */

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

/** Ce qu'on envoie pour te connecter (le back attend email + password) */

export interface LoginPayload {
  email: string;
  password: string;
}
