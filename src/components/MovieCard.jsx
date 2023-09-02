import React from "react";
import placeholder from "../assets/images/placeholder-image.png";
import { starIcon, plusIcon } from "../assets/icons";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, className = "", imageClassName = "" }) => {
  const { image, name, premiered, rating } = movie;

  return (
    <Link to={`/movie/${movie.id}`} className={`movie-card group ${className}`}>
      <figure className="w-full h-full">
        <img
          src={image ? image.medium : placeholder}
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
          <span>{rating?.average != null ? rating.average : ""}</span>
        </div>
        <div>
          <h3>
            <span>{name}</span>
          </h3>
          <p>
            <span>{premiered ? premiered.slice(0, 4) : ""}</span>
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
