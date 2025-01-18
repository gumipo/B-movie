import { PaginationQuery } from "@/types/query";

export type Genre = {
  id: number;
  name: string;
};

export const genreFactory = () => {
  return {
    index: () => {},
  };
};
