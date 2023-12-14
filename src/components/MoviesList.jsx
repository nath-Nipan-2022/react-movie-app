import MovieCard from "./MovieCard";
import Skeletons from "./Skeletons";
import { useState, useRef } from "react";
import chevron from "../assets/icons/chevron.svg";

const List = ({ data: movies, isLoading, endpoint }) => {
  const carouselRef = useRef();
  const carousel = carouselRef.current;

  const [scrollAmount, setScrollAmount] = useState(0);

  const navigation = (direction) => {
    const scrollAmount =
      direction === "left"
        ? carousel.scrollLeft - (carousel.offsetWidth + 16)
        : carousel.scrollLeft + (carousel.offsetWidth + 16);

    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });

    setScrollAmount(scrollAmount);
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

  const renderSkeletons = Array(10)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="shrink-0 basis-44 rounded-xl aspect-[1/1.5] relative bg-[#d49aff69]"
      >
        <article className="absolute inset-0 flex flex-col justify-between p-4 rounded-lg">
          <Skeletons className="w-10 h-3" />
          <div>
            <Skeletons className="w-full h-2 mb-2" />
            <Skeletons className="w-3/4 h-2 mb-3" />
            <div className="flex justify-between gap-3 mt-4">
              <Skeletons className="w-20 rounded-xl h-7" />
              <Skeletons className="rounded-full h-7 w-7" />
            </div>
          </div>
        </article>
      </div>
    ));

  const canScrollMore =
    !scrollAmount ||
    scrollAmount + (carousel?.offsetWidth + 16) < carousel?.scrollWidth;

  return (
    <div className="relative">
      <div className="overflow-hidden">
        {isLoading ? (
          <div className="flex gap-2.5 overflow-y-hidden sm:overflow-hidden min-h-[260px]">
            {renderSkeletons}
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
      </div>
      {/* arrows */}
      {scrollAmount > 0 && (
        <div
          onClick={() => navigation("left")}
          className="rotate-90 carousel-arrow -left-4"
        >
          <img src={chevron} width={10} height={10} alt="left arrow" />
        </div>
      )}
      {canScrollMore && (
        <div
          onClick={() => navigation("right")}
          className="-rotate-90 carousel-arrow -right-4"
        >
          <img src={chevron} width={10} height={10} alt="right arrow" />
        </div>
      )}
    </div>
  );
};
export default List;
