export class Game {
  id!: number;
  title!: string;
  description?: string | null;
  thumbnailUrl?: string | null;
  videoUrl?: string | null;
  genre?: string | null;
  platform?: string | null;
  releaseDate?: string | null;
  rating?: number | string | null;
  isFeatured!: boolean;
  createdAt?: string;
  updatedAt?: string;
}
