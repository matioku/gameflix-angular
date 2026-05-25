import { Game } from './game.model';

export class Favorite {
  id?: number;
  userId?: number;
  gameId?: number;
  game?: Game;
  createdAt?: string;
  updatedAt?: string;
}
