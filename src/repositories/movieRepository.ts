import { Movie } from "@/models/movie";
import { PaginationQuery } from "@/types/query";
import * as http from "@/utils/fetch";

export type MovieRepository = {
  index: (
    searchQuery?: Partial<{ genre_id: number[] }>,
    paginationQuery?: Partial<PaginationQuery>
  ) => Promise<Movie[]>;
  show: (id: number) => Promise<Movie>;
};

const index: MovieRepository["index"] = async () => {
  const movies = await http.get<Movie[]>("/api/movies");
  return movies;
};

const show: MovieRepository["show"] = async (id: number) => {
  const movie = await http.get<Movie>(`/api/movies/${id}`);
  return movie;
};

export const movieRepository: MovieRepository = {
  index,
  show,
};
