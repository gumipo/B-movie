"use client";

import useInfiniteScrollLoad from "@/hooks/useInfiniteScrollLoad";
import { Movie } from "@/models/movie";
import { useParams } from "next/navigation";
import { use, memo } from "react";

type MovieListProps = {
  initialMovies: Promise<Movie[]> | Movie[];
  loadMoreAction: (offset: number, per_page: number) => Promise<Movie[]>;
};

export const StreamingMovieList: React.FC<MovieListProps> = (props) => {
  const initialData = use(props.initialMovies as Promise<Movie[]>);
  return <MovieList {...props} initialMovies={initialData} />;
};

const MovieList: React.FC<MovieListProps> = memo(
  ({ initialMovies, loadMoreAction }) => {
    const params = useParams();

    const {
      values: movies,
      scrollRef,
      isLoading,
      allDataLoaded,
    } = useInfiniteScrollLoad<Movie>(
      initialMovies as Movie[],
      20,
      loadMoreAction
    );

    return (
      <div>
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="group bg-gray-800 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative">
              <img
                src={movie.src}
                alt={movie.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">{movie.title}</h2>
              </div>
              <p className="text-gray-400 mb-4">{movie.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
);
