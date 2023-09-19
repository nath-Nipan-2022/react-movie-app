import { useParams } from "react-router-dom";
import Skeletons from "../../components/Skeletons";
import MovieDetailCard from "./MovieDetailCard";
import {
  useGetMediaByIdQuery,
  useGetMediaDetailsQuery,
} from "../../store/apis/moviesApi";
import Container from "../../components/Container";
import Cast from "./castSection/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./similarSection/Similar";
import Recommended from "./recommendSection/Recommended";

const MovieDetails = () => {
  const { media_type, id } = useParams();

  const {
    data: movie,
    isFetching,
    error,
  } = useGetMediaByIdQuery({ media_type, id });

  // Trailer & official videos
  const { data: videos } = useGetMediaDetailsQuery({
    media_type,
    id,
    detailsQuery: "videos",
  });

  // Directors & writers
  const { data: credits, isFetching: isCastLoading } = useGetMediaDetailsQuery({
    media_type,
    id,
    detailsQuery: "credits",
  });

  return (
    <main className="-mt-[64px]">
      {isFetching ? (
        SkeletonsForCard
      ) : (
        <MovieDetailCard
          movie={movie}
          video={videos?.results?.[0]}
          crew={credits?.crew}
        />
      )}

      {isCastLoading ? SkeletonsForCast : <Cast data={credits?.cast} />}

      <VideosSection videos={videos?.results} />

      <Similar />

      <Recommended />

      {error && <div> Error loading data </div>}
    </main>
  );
};

const SkeletonsForCard = (
  <Container className={"sm:flex sm:gap-8 p-8 pt-20"}>
    <Skeletons className="sm:w-1/2 md:w-2/5 lg:w-80 xl:w-1/2 shrink-0 h-[300px] sm:h-[420px] lg:h-[380px] rounded-lg" />

    <div className="mt-10 sm:mt-0 sm:w-1/2">
      <Skeletons className="w-48 h-3 mb-2 rounded-lg" />
      <Skeletons className="w-24 h-2 mb-2 rounded-lg" />
      <Skeletons className="w-20 h-2 mb-4 rounded-lg" />

      <div className="flex gap-3 mt-4">
        <Skeletons className="w-20 rounded-xl h-7" />
        <Skeletons className="rounded-full h-7 w-7" />
      </div>

      <Skeletons className="w-16 h-2 mt-8 mb-4 rounded-lg" />
      <Skeletons className="h-2 mb-2 rounded-lg" />
      <div className="grid grid-cols-3 space-x-4">
        <Skeletons className="h-2 col-span-2 rounded-lg" />
        <Skeletons className="h-2 col-span-1 rounded-lg" />
      </div>
      <Skeletons className="h-2 mt-2 rounded-lg" />

      <Skeletons className="h-2 mt-8 mb-2 rounded-lg" />
      <div className="grid grid-cols-3 space-x-4">
        <Skeletons className="h-2 col-span-2 rounded-lg" />
        <Skeletons className="h-2 col-span-1 rounded-lg" />
      </div>
      <Skeletons className="h-2 mt-2 rounded-lg" />
    </div>
  </Container>
);

const SkeletonsForCast = (
  <Container className={"px-8"}>
    <div className="flex flex-wrap gap-4 my-4">
      <Skeletons times={10} className="w-16 h-16 rounded-full" />
    </div>
  </Container>
);

export default MovieDetails;
