import { genrefactory } from "@/models/genre";
import { getMovies } from "./_action";

export default async function IndexPage() {
  const movies = await getMovies();
  const genres = await genrefactory().index();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {movies.map((movie) => (
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
