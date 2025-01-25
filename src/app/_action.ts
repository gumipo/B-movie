import { Movie, movieFactory } from "@/models/movie";
import { cache } from "react";

export const getMovies = cache(async (): Promise<Movie[]> => {
  try {
    const movies = await movieFactory().index();
    return movies;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
