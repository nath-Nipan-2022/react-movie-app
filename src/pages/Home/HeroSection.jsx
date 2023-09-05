import { useEffect, useState } from "react";
import searchIcon from "../../assets/icons/search.svg";
import { useNavigate } from "react-router-dom";
import { useGetMoviesQuery } from "../../store/apis/moviesApi";
import { useSelector } from "react-redux";
import Image from "../../components/lazyLoadImg/Image";

const HeroSection = () => {
  const [backdropUrl, setBackdropUrl] = useState("");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const { urls } = useSelector((state) => state.ImagesUrls);

  const { data: movies, error } = useGetMoviesQuery("/movie/popular");

  useEffect(() => {
    const randomMovie = movies?.results[Math.floor(Math.random() * 20)];
    const imageUrl =
      urls?.images?.secure_base_url + "original" + randomMovie?.backdrop_path;

    setBackdropUrl(imageUrl);
  }, [movies, urls]);

  const handleSubmit = (e) => {
    e.preventDefault();
    search.length > 0 && navigate("/search/" + search);
  };

  return (
    <section className="relative z-0 grid place-items-center h-[450px] md:h-[800px">
      <figure className="absolute inset-0 -z-10">
        <Image
          src={backdropUrl}
          className={"movie-image rounded-none"}
          style={{ opacity: 0.35 }}
        />
      </figure>
      {/* subtle gradient */}
      <div className="absolute h-60 w-full bottom-0 -z-10 bg-gradient-to-t from-dark-color to-transparent"></div>

      <div className="text-center">
        <h1 className="text-4xl font-bold w-fit mx-auto mb-4 text-gradient">
          Welcome.
        </h1>
        <p className="text-gray-200 mb-8 max-w-sm mx-auto">
          Millions of movies, TV shows and people to discover in one platform.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto relative rounded-3xl"
        >
          <img
            src={searchIcon}
            alt="search icon"
            width={16}
            className="absolute left-4 top-3"
          />
          <input
            type="search"
            value={search}
            placeholder="Search movies or TV shows..."
            name="movie-search"
            id="movie-search"
            onChange={(e) => setSearch(e.target.value)}
            className="search-input py-[0.525rem]"
          />
        </form>
      </div>
    </section>
  );
};

export default HeroSection;