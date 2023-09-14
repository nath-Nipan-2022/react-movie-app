import placeholder from "../../assets/images/placeholder-image.png";
import { playIcon, plusIcon, starIcon } from "../../assets/icons";
import { useSelector } from "react-redux";
import Image from "../../components/lazyLoadImg/Image";
import Container from "../../components/Container";
import PopupVideo from "../../components/PopupVideo";
import { useState } from "react";

const MovieDetailCard = ({ movie, video, crew, className = "" }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoId, setVideoId] = useState(null);

  const { backdrop_path, poster_path } = movie;

  const { urls } = useSelector((state) => state.ImagesUrls);
  const imageUrl = urls.images.secure_base_url;

  const formateDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toDateString().slice(4);
  };

  const formateRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const directors = crew?.filter((c) => c.job === "Director");

  const writers = crew?.filter(
    (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
  );

  const openVideo = () => {
    setShowVideo(true);
    setVideoId(video.key);
  };
  const closeVideo = () => {
    setShowVideo(false);
    setVideoId(null);
  };

  return (
    <section className="relative z-0 bg-dark-color">
      <figure className="absolute inset-0 -z-10">
        <Image
          src={`${imageUrl}w780${backdrop_path}` || placeholder}
          className={"movie-image rounded-none"}
          style={{ opacity: 0.35 }}
        />
      </figure>
      <div className="absolute inset-0 h-full -z-10 bg-gradient-to-t from-dark-color to-dark-color/0"></div>

      <Container className={"sm:flex sm:gap-8 px-6 pt-20 pb-0"}>
        {/* poster */}
        <div className="sm:w-1/2 md:w-2/5 lg:w-80 shrink-0 h-[500px] lg:h-[450px]">
          <Image
            src={`${imageUrl}w780${poster_path}` || placeholder}
            alt="movie poster"
            className={`movie-image object-center`}
          />
        </div>

        {/* details */}
        <article className="mt-8 sm:mt-0">
          <div className="mb-1 -mt-1">
            <span className="text-xl font-semibold">
              {movie?.title || movie?.name}{" "}
            </span>
            <span className="text-sm">
              (
              {movie?.release_date?.slice(0, 4) ||
                movie?.first_air_date?.slice(0, 4)}
              )
            </span>
          </div>
          <div className="text-sm text-gray-400">{movie.tagline}</div>

          <div className="mt-2 text-xs text-gray-400/80">
            {movie?.genres?.map((g) => (
              <span
                key={g.id}
                className="rounded-md p-0.5 px-2 text-white bg-accent-color/50 mr-2"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="mt-2 flex items-center gap-1 w-fit p-0.5">
            <img
              src={starIcon}
              alt="star icon"
              width={16}
              height={16}
              className=""
            />
            <span>{movie?.vote_average.toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={openVideo}
              className="flex items-center px-2.5 py-1.5 primary-btn gap-1"
            >
              <img src={playIcon} width={20} height={20} alt="play icon" />
              <span>Watch Trailer</span>
            </button>
            <button className="grid w-8 h-8 plus-btn place-items-center">
              <img
                src={plusIcon}
                alt="plus icon"
                width={18}
                height={16}
                className="h-full"
              />
            </button>
          </div>

          <div className="mt-5">
            <span className="text-gray-200">Overview</span>
            <p className="mt-1 text-xs leading-relaxed text-gray-400">
              {movie.overview}
            </p>
          </div>

          {movie?.status && (
            <div className="inline-flex flex-col gap-1 mt-5 mr-5">
              <span className="text-sm text-gray-200 ">Status: </span>
              <span className="text-xs text-gray-400/80">{movie.status}</span>
            </div>
          )}

          {(movie?.release_date || movie?.first_air_date) && (
            <div className="inline-flex flex-col gap-1 mr-5">
              <span className="text-sm text-gray-200">Release Date: </span>
              <span className="text-xs text-gray-400/80">
                {movie?.release_date
                  ? formateDate(movie.release_date)
                  : formateDate(movie.first_air_date)}
              </span>
            </div>
          )}

          {movie?.runtime && (
            <div className="inline-flex flex-col gap-1">
              <span className="text-sm text-gray-200">Runtime: </span>
              <span className="text-xs text-gray-400/80">
                {formateRuntime(movie.runtime)}
              </span>
            </div>
          )}

          {directors?.length > 0 && (
            <div className="pt-1 mt-2 border-t border-gray-700/50">
              <span className="text-sm text-gray-200">Director: </span>
              {directors.map((d, i) => (
                <span key={i} className="text-xs text-gray-400/80">
                  {d.name}
                  {directors.length - 1 !== i && ", "}
                </span>
              ))}
            </div>
          )}

          {writers?.length > 0 && (
            <div className="pt-1 mt-2 border-t border-gray-700/50">
              <span className="text-sm text-gray-200">Writers: </span>
              {writers.map((d, i) => (
                <span key={i} className="text-xs text-gray-400/80">
                  {d.name}
                  {writers.length - 1 !== i && ", "}
                </span>
              ))}
            </div>
          )}

          {movie?.created_by?.length > 0 && (
            <div className="py-1 mt-2 border-t border-gray-700/50">
              <span className="text-sm text-gray-200">Creator: </span>
              {movie?.created_by?.map((d, i) => (
                <span key={i} className="text-xs text-gray-400/80">
                  {d.name}
                  {movie?.created_by?.length - 1 !== i && ", "}
                </span>
              ))}
            </div>
          )}

          {showVideo && (
            <PopupVideo
              videoId={videoId}
              open={showVideo}
              onClose={closeVideo}
            />
          )}
        </article>
      </Container>
    </section>
  );
};
export default MovieDetailCard;
