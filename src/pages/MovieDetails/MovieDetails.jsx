import { useParams } from "react-router-dom";
import Skeletons from "../../components/Skeletons";
import MovieDetailCard from "./MovieDetailCard";
import { useGetMediaByIdQuery } from "../../store/apis/moviesApi";
import Container from "../../components/Container";

const MovieDetails = () => {
  const { media_type, id } = useParams();

  const {
    data: movie,
    isLoading,
    error,
  } = useGetMediaByIdQuery({ media_type, id });

  const renderSkeletons = (
    <Container className="sm:flex sm:gap-8 p-4 pt-16">
      <Skeletons className="rounded-lg sm:w-1/2 md:h-[350px]" />

      <div className="mt-10 sm:mt-0 sm:w-1/2">
        <Skeletons className="rounded-lg h-2 mb-2" />

        <div className="grid grid-cols-3 space-x-4 mb-2">
          <Skeletons className="rounded-lg h-2 col-span-2" />
          <Skeletons className="rounded-lg h-2 col-span-1" />
        </div>

        <Skeletons className="rounded-lg h-2 mb-5" />

        <div className="flex gap-3">
          <Skeletons className="rounded-lg h-7 w-20" />
          <Skeletons className="rounded-full h-7 w-7" />
        </div>
      </div>
    </Container>
  );

  return (
    <main className="min-h-screen -mt-[64px]">
      {isLoading ? renderSkeletons : <MovieDetailCard movie={movie} />}
      {error && <div> Error loading data </div>}
    </main>
  );
};

export default MovieDetails;
