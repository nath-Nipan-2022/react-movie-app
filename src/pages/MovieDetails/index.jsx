import { useParams } from "react-router-dom";
import { useFetch } from "../../hook/useFetch";
import Skeletons from "../../components/Skeletons";
import MovieDetailCard from "./MovieDetailCard";

const MovieDetails = () => {
  const { id } = useParams();
  const BASE_URL = "https://api.tvmaze.com";
  const url = `${BASE_URL}/shows/${id}`;

  const { data: movie, loading } = useFetch(url);

  return (
    <div className="p-4 grid min-h-screen grid-cols-[auto_1fr_auto]">
      {/* <div className="absolute left-0 top-0 -translate-x-1/2 md:sticky md:translate-x-0 bg-slate-800 w-[200px]"></div> */}
      <main className="grid p-4 max-w-3xl mx-auto">
        {loading ? <Skeletons /> : <MovieDetailCard movie={movie} />}
      </main>
    </div>
  );
};

export default MovieDetails;
