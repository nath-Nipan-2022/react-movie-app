import placeholder from "../assets/images/placeholder-image.png";
import { starIcon, plusIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Image from "./lazyLoadImg/Image";

const MovieCard = ({
  movie,
  endpoint,
  className = "",
  imageClassName = "",
}) => {
  const {
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = movie;

  const { urls } = useSelector((state) => state.ImagesUrls);

  const imageUrl = urls?.images?.secure_base_url + "w342" + poster_path;

  return (
    <Link
      to={`/${movie.media_type || endpoint}/${movie.id}`}
      className={`movie-card group ${className}`}
    >
      <Image
        src={poster_path ? imageUrl : placeholder}
        alt="movie poster"
        style={{ transition: ".3s" }}
        className={`movie-image scale-110 group-hover:scale-100 ${imageClassName}`}
      />

      <article className="movie-desc text-sm">
        <div className="text-xs flex items-center gap-1 rounded bg-black w-fit p-0.5 px-1">
          <img
            src={starIcon}
            alt="star icon"
            width={12}
            height={12}
            className="mb-0.5"
          />
          <span>{vote_average != null ? vote_average.toFixed(1) : ""}</span>
        </div>
        <div>
          <h3>{title || name}</h3>
          <p>
            {release_date
              ? release_date?.slice(0, 4)
              : first_air_date?.slice(0, 4)}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <button className="primary-btn">Watch Now</button>
            <button className="plus-btn grid place-items-center">
              <img
                src={plusIcon}
                alt="plus icon"
                width={18}
                height={16}
                className="h-full"
              />
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default MovieCard;
