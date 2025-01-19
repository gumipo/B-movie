import { Genre } from "@/models/genre";

export type GenreRepository = {
  index: () => Promise<Genre[]>;
};

const index: GenreRepository["index"] = async () => {
  return [];
};

export const genreRepository: GenreRepository = {
  index,
};
