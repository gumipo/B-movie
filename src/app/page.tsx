import { MovieCard } from "@/components/MovieCard";
import { mockMovies } from "@/utils/mocks/movies";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 to-pink-600 opacity-10" />
        <nav className="relative border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                {/* <Icons.Film /> */}
                <span className="text-xl font-bold text-white">B級映画DB</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="映画を検索..."
                    className="bg-gray-800 text-gray-300 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">
                    {/* <Icons.Search /> */}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  {/* <Icons.Menu /> */}
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="relative container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            珠玉のB級映画コレクション
          </h1>
          <p className="mt-4 text-xl text-gray-400">
            魅力あふれるB級映画の世界へようこそ
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} genres={["etes", "test"]} />
          ))}
        </div>
      </main>
    </div>
  );
}
