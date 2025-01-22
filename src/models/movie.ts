import {
  movieRepository,
  MovieRepository,
} from "@/repositories/movieRepository";
import { Genre } from "./genre";
import { PaginationQuery } from "@/types/query";

export type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  genres: Genre[];
};

export const movieFactory = (repository: MovieRepository = movieRepository) => {
  return {
    index: (
      searchQuery?: Partial<{ genre_id: number[] }>,
      paginationQuery?: Partial<PaginationQuery>
    ) => {
      return repository.index(searchQuery, paginationQuery);
    },
    // show: (id: number) => {
    //   return repository.show(id);
    // },
  };
};
