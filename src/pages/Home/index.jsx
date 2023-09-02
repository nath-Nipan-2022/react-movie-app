import { useState } from "react";
import { useFetch } from "../../hook/useFetch";
import SearchBar from "../../components/SearchBar";
import Skeletons from "../../components/Skeletons";
import MovieCard from "../../components/MovieCard";

const Home = () => {
  const [search, setSearch] = useState("");

  // let url = "https://api.tvmaze.com" + "/shows";
  // if (search) {
  //   url = "https://api.tvmaze.com" + "/search/shows?q=" + search;
  // }

  const { data: movies, isLoading } = useFetch("/movie/popular");

  const handleSearch = (term) => {
    setSearch(term);
  };

  const renderMovies = movies.slice(0, 45).map((movie) => {
    return (
      <MovieCard key={movie.id || movie.show.id} movie={movie.show || movie} />
    );
  });

  return (
    <div className="p-4 px-8 w-container mx-auto min-h-screen">
      <h1 className="text-4xl w-fit mx-auto mb-2 text-center text-gradient">
        MovieLand
      </h1>
      <header className="sticky top-3 z-10">
        <SearchBar handleSearch={handleSearch} />
      </header>

      <main>
        <div className="movies_container">
          {isLoading ? <Skeletons times={10} /> : renderMovies}
        </div>
      </main>
    </div>
  );
};
export default Home;
