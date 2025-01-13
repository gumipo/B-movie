import { Genre } from "./genre";

export type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  genres: Genre[];
};

export const movieFactory = () => {
  return {
    index: () => {},
    show: () => {},
  };
};
