import {
  genreRepository,
  GenreRepository,
} from "@/repositories/genreRepository";

export type Genre = {
  id: number;
  name: string;
};

export type MovieSearchQuery = {
  name: string | undefined;
  genre_id: string | undefined;
};

export const genreFactory = (repository: GenreRepository = genreRepository) => {
  return {
    index: async () => {
      return await repository.index();
    },
  };
};
