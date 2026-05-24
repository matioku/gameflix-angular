# GameFlix Front (minimal)

Angular 21 • Authentification seule contre `gameflix-back` (`http://localhost:3000/api`).

## Prérequis

- Backend lancé : `bun run dev` dans `gameflix-back` (port **3000**).
- CORS backend : prévoir par ex. dans `.env` du back  
  `FRONTEND_ORIGIN=http://localhost:4200`.

## Installer & lancer

```bash
cd gameflix-front
npm install    # déjà fait si tu viens de ng new
ng serve --open    # ou : npm start → http://localhost:4200
```

Ce dépôt a été généré localement sous **`Downloads/project-02/gameflix-front`**. Sur Windows, place le dossier équivalent où tu préfères, par ex. `C:\Users\...\project-02\gameflix-front`, et vérifie l’URL de l’API dans `src/environments/environment.ts`.

## Routes

| URL            | Role                          |
|----------------|-------------------------------|
| `/` → redirect | vers `/login`                 |
| `/login`       | Formulaire connexion           |
| `/register`    | Formulaire inscription         |
| `/home`        | Protégée (JWT obligatoire)    |
| `**`           | → `/login`                    |

JWT stocké sous **`gameflix_token`** dans `localStorage`.

## Arborescence utile

- `src/app/core/` — `AuthService`, `authInterceptor`, `authGuard`, constantes
- `src/app/pages/` — `login`, `register`, `home`
- `src/environments/environment.ts` — URL de base de l’API

## Comprendre l’auth (version simple pour un cours)

Imaginons trois acteurs : ton **formulaire Angular**, ton **backend**, et ton **navigateur**.

1. Quand quelqu’un se **connecte**, le backend renvoie un **jeton** (JWT). C’est comme un badge numérique : « cette personne s’est bien identifiée ». Angular le sauvegarde avec `AuthService.saveToken(...)` dans le **stockage local** du navigateur (tu peux voir cette valeur dans les outils développeur).

2. Aux requêtes suivantes (« qui suis‑je ? », liste des jeux plus tard…), il faut montrer le badge au backend. Au lieu de le recopier dans chaque `HttpClient.get()`, on passe par un **intercepteur** : avant chaque requête HTTP, il lit le jeton dans le stockage et ajoute automatiquement l’en‑tête `Authorization: Bearer ...`.

3. La route **`/home`** est sensée être privée : on utilise un **guard**. C’est une petite fonction jouée avant d’afficher la page : « est‑ce que j’ai un jeton ? Sinon je renvoie l’utilisateur vers **`/login`**. » Ça évite qu’il tape `/home` à la main dans la barre d’URL sans être connecté.

4. **`/me`** permet de tester la chaîne complète : l’intercepteur ajoute le jeton ; le backend valide ce jeton ; la page **Home** affiche le pseudonyme / l’email reçus dans la réponse.

Chaque fichier important du dossier **`core`** et **`pages/login|register|home`** est commenté en français dans le code pour suivre ces étapes mot à mot.
