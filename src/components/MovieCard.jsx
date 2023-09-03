import placeholder from "../assets/images/placeholder-image.png";
import { starIcon, plusIcon } from "../assets/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MovieCard = ({ movie, className = "", imageClassName = "" }) => {
  const { title, backdrop_path, release_date, vote_average } = movie;

  const ImagesUrls = useSelector((state) => state.ImagesUrls);

  const imageUrl =
    ImagesUrls.urls?.images.secure_base_url + "w300" + backdrop_path;
  // "https://www.themoviedb.org/t/p/w220_and_h330_face/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg";

  return (
    <Link to={`/movie/${movie.id}`} className={`movie-card group ${className}`}>
      <figure className="w-full h-full">
        <img
          src={backdrop_path ? imageUrl : placeholder}
          alt="movie poster"
          className={`movie-image scale-110 group-hover:scale-100 ${imageClassName}`}
        />
      </figure>

      <article className="movie-desc text-sm">
        <div className="text-xs flex items-center gap-1 rounded bg-black w-fit p-0.5 px-1">
          <img
            src={starIcon}
            alt="star icon"
            width={12}
            height={12}
            className="mb-0.5"
          />
          <span>{vote_average != null ? vote_average : ""}</span>
        </div>
        <div>
          <h3>{title}</h3>
          <p>{release_date ? release_date.slice(0, 4) : ""}</p>

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
