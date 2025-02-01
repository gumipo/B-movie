import { Genre } from "@/models/genre";
import * as http from "@/utils/fetch";

export type GenreRepository = {
  index: () => Promise<Genre[]>;
};

const index: GenreRepository["index"] = async () => {
  const genres = await http.get<Genre[]>("/api/genres");
  return genres;
};

export const genreRepository: GenreRepository = { index };
