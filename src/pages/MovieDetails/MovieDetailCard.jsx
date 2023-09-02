import placeholder from "../../assets/images/placeholder-image.png";
import { plusIcon, starIcon } from "../../assets/icons";

const MovieDetailCard = ({ movie, className = "" }) => {
  const { image, name, premiered, rating } = movie;

  return (
    <article className={`movie-card group aspect-video ${className}`}>
      <figure className="w-full h-full">
        <img
          src={image ? image.original : placeholder}
          alt="movie poster"
          className={`movie-image scale-110 group-hover:scale-100`}
        />
      </figure>

      <article className="movie-desc p-6 justify-end">
        <div className="relative">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm mb-1">
            {premiered ? premiered.slice(0, 4) : ""}
          </p>

          <div className="text-xs flex items-center gap-1 w-fit p-0.5">
            <img
              src={starIcon}
              alt="star icon"
              width={12}
              height={12}
              className="mb-0.5"
            />
            <span>{rating?.average != null ? rating.average : ""} rating</span>
          </div>

          <div className="absolute right-0 bottom-0 flex items-center gap-1">
            <button className="primary-btn py-2 px-4">Watch Now</button>
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
        </div>
      </article>
    </article>
  );
};
export default MovieDetailCard;
