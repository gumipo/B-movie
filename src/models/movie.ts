import {
  movieRepository,
  MovieRepository,
} from "@/repositories/movieRepository";
import { Genre, MovieSearchQuery } from "./genre";
import { PaginationQuery } from "@/types/query";

export type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  src: string;
  genres: Genre[];
};

export const movieFactory = (repository: MovieRepository = movieRepository) => {
  return {
    index: (
      searchQuery?: Partial<MovieSearchQuery>,
      paginationQuery?: Partial<PaginationQuery>
    ) => {
      return repository.index(searchQuery, paginationQuery);
    },
    // show: (id: number) => {
    //   return repository.show(id);
    // },
  };
};
