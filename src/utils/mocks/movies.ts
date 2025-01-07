import { Movie } from "@/models/movie";
import { mockGenres } from "./genres";

export const mockMovies: Movie[] = [
  {
    id: 1,
    title: "シャークネード",
    year: 2013,
    genres: mockGenres,
    description:
      "竜巻とサメが合体した前代未聞の自然災害に立ち向かう人々を描いた...",
    image: "/api/placeholder/300/400",
  },
  {
    id: 2,
    title: "プラン9・フロム・アウタースペース",
    year: 1959,
    genres: mockGenres,
    description:
      "エド・ウッド監督による不朽の名作。宇宙人による地球侵略計画を描いた...",
    image: "/api/placeholder/300/400",
  },
];
