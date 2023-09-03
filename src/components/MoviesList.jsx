import MovieCard from "./MovieCard";
import Skeletons from "./Skeletons";
import { useGetMoviesQuery } from "../store/apis/moviesApi";

const MoviesList = ({ moviesType }) => {
  const {
    data: movies,
    isFetching,
    error,
  } = useGetMoviesQuery(`/movie/${moviesType}`);

  const renderMovies = movies?.results.map((movie) => {
    return (
      <MovieCard key={movie.id || movie.show.id} movie={movie.show || movie} />
    );
  });

  return (
    <div className="movies_container">
      {isFetching ? <Skeletons times={10} /> : renderMovies}
      {error && "Error loading movies"}
    </div>
  );
};
export default MoviesList;
