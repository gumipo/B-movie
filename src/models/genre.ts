import {
  genreRepository,
  GenreRepository,
} from "@/repositories/genreRepository";

export type Genre = {
  id: number;
  name: string;
};

export const genrefactory = (repository: GenreRepository = genreRepository) => {
  return {
    index: () => {
      repository.index();
    },
  };
};
