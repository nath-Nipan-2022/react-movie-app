import { forwardRef, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import placeholder from "../assets/images/placeholder-image.png";
import { check, plusIcon, starIcon } from "../assets/icons";
import Image from "./lazyLoadImg/Image";
import { addToWatchList } from "../store/slices/watchListSlice";

const MovieCard = forwardRef(function MovieCard(
  { movie, endpoint, className, imageClassName },
  ref
) {
  const {
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
  } = movie;

  const buttonRef = useRef();
  const dispatch = useDispatch();

  const { urls } = useSelector((state) => state.ImagesUrls);
  const imageUrl = urls?.images?.secure_base_url + "w342" + poster_path;

  const watchList = useSelector((state) => state.watchList);
  let isAdded = watchList.find((item) => item.id === movie.id);

  const navigate = useNavigate();

  // button interactivity
  const handleCardClick = (event) => {
    event.preventDefault();
    if (buttonRef.current.contains(event.target)) {
      dispatch(addToWatchList({ ...movie, endpoint }));
      return;
    }
    navigate(`/${movie.media_type || endpoint}/${movie.id}`);
  };

  const cardBody = (
    <>
      <Image
        src={poster_path ? imageUrl : placeholder}
        alt="movie poster"
        style={{ transition: ".3s" }}
        className={`movie-image scale-110 group-hover:scale-100 ${imageClassName}`}
      />

      <article className="text-sm movie-desc">
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
          <p className="opacity-90">
            {release_date
              ? release_date?.slice(0, 4)
              : first_air_date?.slice(0, 4)}
          </p>

          <div className="flex items-center justify-between mt-2">
            <button className="primary-btn">Watch Now</button>
            <button
              ref={buttonRef}
              className="grid plus-btn place-items-center"
            >
              <img
                src={isAdded ? check : plusIcon}
                title={`${isAdded ? "Added" : "Add"} to watchList`}
                alt="plus icon"
                width={18}
                height={16}
                className="h-full"
              />
            </button>
          </div>
        </div>
      </article>
    </>
  );

  if (ref) {
    return (
      <Link
        onClick={handleCardClick}
        className={`movie-card group ${className}`}
        ref={ref}
      >
        {cardBody}
      </Link>
    );
  } else {
    return (
      <Link
        to={`/${movie.media_type || endpoint}/${movie.id}`}
        onClick={handleCardClick}
        className={`movie-card group ${className}`}
      >
        {cardBody}
      </Link>
    );
  }
});

export default MovieCard;
