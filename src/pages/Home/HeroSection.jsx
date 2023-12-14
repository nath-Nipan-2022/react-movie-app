import { useEffect, useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../../store/apis/moviesApi";
import { useSelector } from "react-redux";
import Image from "../../components/lazyLoadImg/Image";

const HeroSection = () => {
  const [backdropUrl, setBackdropUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { urls } = useSelector((state) => state.ImagesUrls);
  const imageUrl = urls?.images?.secure_base_url;
  const { data: movies, error } = useGetMoviesQuery("/movie/popular");

  useEffect(() => {
    const randomMovie = movies?.results[Math.floor(Math.random() * 20)];
    setBackdropUrl(randomMovie?.backdrop_path);
  }, [movies]);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuery.length > 0 && navigate("/search/" + searchQuery);
  };

  return (
    <section className="relative z-0 grid place-items-center h-[450px]">
      <figure className="absolute inset-0 -z-10">
        <Image
          src={imageUrl + "w1280" + backdropUrl}
          className={"movie-image rounded-none lg:object-top"}
          style={{ opacity: 0.35 }}
        />
      </figure>
      {/* subtle gradient */}
      <div className="absolute bottom-0 w-full h-60 -z-10 bg-gradient-to-t from-dark-color to-transparent"></div>

      <div className="px-8 text-center">
        <h1 className="mx-auto mb-6 text-5xl font-bold lg:text-6xl w-fit text-gradient">
          Welcome.
        </h1>
        <p className="max-w-sm mx-auto mb-8 text-gray-200">
          Millions of movies, TV shows and people to discover in one platform.
        </p>
        <form
          onSubmit={handleSubmit}
          className="relative max-w-md mx-auto rounded-3xl"
        >
          <img
            src={searchIcon}
            alt="search icon"
            width={16}
            className="absolute left-4 top-3"
          />
          <input
            type="search"
            value={searchQuery}
            placeholder="Search Movies or TV shows..."
            name="movie-search"
            id="movie-search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input py-[0.525rem]"
          />
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
