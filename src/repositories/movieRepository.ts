import { Movie } from "@/models/movie";
import { PaginationQuery } from "@/types/query";

export type MovieRepository = {
  index: (
    searchQuery?: Partial<{ genre_id: number[] }>,
    paginationQuery?: Partial<PaginationQuery>
  ) => Promise<Movie[]>;
  // show: (id: number) => Promise<Movie>;
};

const index: MovieRepository["index"] = async () => {
  return [];
};

// const show: MovieRepository["show"] = async (id: number) => {
//   return {};
// };

export const movieRepository: MovieRepository = {
  index,
  // show,
};
