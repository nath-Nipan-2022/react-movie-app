import MovieCard from "./MovieCard";
import Skeletons from "./Skeletons";
import { useGetMoviesQuery } from "../store/apis/moviesApi";
import { useRef } from "react";
import rightArrow from "../assets/icons/right-arrow.svg";
import leftArrow from "../assets/icons/left-arrow.svg";

const List = ({ url, endpoint }) => {
  const { data: movies, isFetching, error } = useGetMoviesQuery(`${url}`);

  const carouselRef = useRef();

  const navigation = (direction) => {
    const carousel = carouselRef.current;

    const scrollAmount =
      direction === "left"
        ? carousel.scrollLeft - (carousel.offsetWidth + 16)
        : carousel.scrollLeft + (carousel.offsetWidth + 16);

    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const renderMovies = movies?.results.map((movie) => {
    return (
      <MovieCard
        key={movie.id || movie.show.id}
        movie={movie.show || movie}
        endpoint={endpoint}
        className="shrink-0 basis-44 bg-skeleton aspect-[1/1.5]"
      />
    );
  });

  return (
    <div className="overflow-hidden relative">
      {isFetching ? (
        <div className="flex gap-2.5 overflow-y-hidden sm:overflow-hidden min-h-[260px]">
          <Skeletons
            times={10}
            className="shrink-0 basis-44 rounded-xl aspect-[1/1.5]"
          />
        </div>
      ) : (
        // Carousel
        <div
          ref={carouselRef}
          className="flex gap-2.5 overflow-y-hidden sm:overflow-hidden min-h-[260px]"
        >
          {renderMovies}
        </div>
      )}
      {/* arrows */}
      <div onClick={() => navigation("left")} className="carousel-arrow left-4">
        <img src={leftArrow} width={20} height={20} alt="left arrow" />
      </div>
      <div
        onClick={() => navigation("right")}
        className="carousel-arrow right-4"
      >
        <img src={rightArrow} width={20} height={20} alt="right arrow" />
      </div>
      {error && "Error loading movies"}
    </div>
  );
};
export default List;
