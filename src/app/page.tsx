import { Suspense } from "react";
import { getGenres, getMovies } from "./_action";
import { StreamingMovieList } from "@/components/MovieList";
import { NextPage } from "next";
import { MovieSearchQuery } from "@/models/genre";

const MovieListPage: NextPage<{
  searchParams: Promise<Partial<MovieSearchQuery>>;
}> = async (props) => {
  const searchParams = await props.searchParams;
  const movies = getMovies();
  // const genres = await getGenres();

  const loadMoreMovies = async (offset: number = 0, per_page: number) => {
    "use server";
    const Movies = await getMovies(searchParams, { offset, per_page });
    return Movies;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <Suspense fallback={<>loading...</>}>
        <StreamingMovieList
          initialMovies={movies}
          loadMoreAction={loadMoreMovies}
        />
      </Suspense>
    </div>
  );
};

export default MovieListPage;
