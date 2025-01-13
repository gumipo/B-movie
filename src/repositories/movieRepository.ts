import { Movie } from "@/models/movie";

type MovieRepository = {
  index: () => Promise<Movie[]>;
  show: (id: number) => Promise<Movie>;
};

const index = () => {};

const show = (id: number) => {};
