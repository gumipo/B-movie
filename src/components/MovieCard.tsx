import { Movie } from "@/models/movie";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className="relative group bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-64 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 w-full p-6 transform transition-transform duration-300">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400">
          {movie.title}
        </h3>
        <div className="flex items-center space-x-3 text-gray-300 mb-3">
          {/* <div className="flex items-center space-x-1">
            <Icons.Calendar />
            <span>{year}</span>
          </div> */}
        </div>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((g) => (
            <span
              key={g.id}
              className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
