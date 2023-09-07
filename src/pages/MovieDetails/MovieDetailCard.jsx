import placeholder from "../../assets/images/placeholder-image.png";
import { plusIcon, starIcon } from "../../assets/icons";
import { useSelector } from "react-redux";
import Image from "../../components/lazyLoadImg/Image";
import Container from "../../components/Container";

const MovieDetailCard = ({ movie, className = "" }) => {
  const { backdrop_path, poster_path } = movie;

  const ImagesUrls = useSelector((state) => state.ImagesUrls);
  const imageUrl = ImagesUrls.urls.images.secure_base_url;

  const formateDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toDateString().slice(4);
  };

  const formateRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  return (
    <section className="relative z-0">
      <figure className="absolute inset-0 -z-10">
        <Image
          src={`${imageUrl}w780${backdrop_path}` || placeholder}
          className={"movie-image rounded-none"}
          style={{ opacity: 0.35 }}
        />
      </figure>
      <div className="absolute w-full left-0 bottom-0 -z-10 bg-gradient-to-t from-dark-color h-96 to-transparent"></div>

      <Container className={"sm:flex sm:gap-8 p-8 pt-16"}>
        {/* poster */}
        <div className="sm:w-1/2 shrink-0 sm:max-h-[350px]">
          <Image
            src={`${imageUrl}original${poster_path}` || placeholder}
            alt="movie poster"
            className={`movie-image`}
          />
        </div>

        {/* details */}
        <article className="mt-8 sm:mt-0">
          <div className="mb-1">
            <span className="text-xl font-semibold">
              {movie?.title || movie?.name}{" "}
            </span>
            <span className="text-sm">
              (
              {movie?.release_date.slice(0, 4) ||
                movie?.first_air_date.slice(0, 4)}
              )
            </span>
          </div>
          <div className="text-sm text-gray-400">{movie.tagline}</div>

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

          <div className="mt-3 flex items-center gap-4">
            <button className="primary-btn py-2 px-4">Watch Trailer</button>
            <button className="plus-btn grid place-items-center w-8 h-8">
              <img
                src={plusIcon}
                alt="plus icon"
                width={18}
                height={16}
                className="h-full"
              />
            </button>
          </div>

          <div className="mt-6">
            <span className="text-gray-200">Overview</span>
            <p className="mt-1 text-xs leading-relaxed text-gray-400/80">
              {movie.overview}
            </p>
          </div>

          {movie?.status && (
            <div className="mt-6 inline-block">
              <span className="text-gray-200 text-sm">Status: </span>
              <span className=" text-xs text-gray-400/80">{movie.status}</span>
            </div>
          )}

          {(movie?.release_date || movie?.first_air_date) && (
            <div className="ml-5 inline-block">
              <span className="text-gray-200 text-sm">Release Date: </span>
              <span className=" text-xs text-gray-400/80">
                {movie?.release_date
                  ? formateDate(movie.release_date)
                  : formateDate(movie.first_air_date)}
              </span>
            </div>
          )}

          {movie?.runtime && (
            <div className="ml-5 inline-block">
              <span className="text-gray-200 text-sm">Runtime: </span>
              <span className=" text-xs text-gray-400/80">
                {formateRuntime(movie.runtime)}
              </span>
            </div>
          )}
        </article>
      </Container>
    </section>
  );
};
export default MovieDetailCard;
