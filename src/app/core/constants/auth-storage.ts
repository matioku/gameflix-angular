/**
 * Nom de la clef utilisée dans le navigateur pour stocker le jeton JWT.
 *
 * Pourquoi un fichier séparé ? Parce que l'intercepteur HTTP (qui ajoute le header
 * Authorization) ne doit pas forcément passer par AuthService pour lire ce jeton —
 * ça évite des dépendances circulaires avec HttpClient qu'on garderait peu claires pour un débutant.
 *
 * Dans les DevTools : Application → Stockage local → tu verras cette clef avec la valeur du token.
 */
export const AUTH_TOKEN_STORAGE_KEY = 'gameflix_token';
