export type Movie = {
  id: number;
  title: string;
  year: number;
  description: string;
  image: string;
  genres: Genre[];
};

export type Genre = {
  id: number;
  name: string;
};
