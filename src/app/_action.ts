import { Genre, genreFactory, MovieSearchQuery } from "@/models/genre";
import { Movie, movieFactory } from "@/models/movie";
import { PaginationQuery } from "@/types/query";
import { cache } from "react";

export const getMovies = cache(
  async (
    searchParams?: Partial<MovieSearchQuery>,
    paginationQuery?: Partial<PaginationQuery>
  ): Promise<Movie[]> => {
    try {
      const movies = await movieFactory().index();
      return movies;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const getGenres = cache(async (): Promise<Genre[]> => {
  try {
    const genres = await genreFactory().index();
    return genres;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
