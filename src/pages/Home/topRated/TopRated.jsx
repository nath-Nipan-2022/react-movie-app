import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";
import { useGetMoviesQuery } from "../../../store/apis/moviesApi";
import { starIcon } from "../../../assets/icons";

const media_types = ["Movies", "TV Shows"];

const TopRated = () => {
  const [endpoint, setEndpoint] = useState("Movies");

  let updatedEndpoint = "";
  if (endpoint === "TV Shows".toLowerCase()) {
    updatedEndpoint = "tv";
  } else {
    updatedEndpoint = "movie";
  }

  const { data, isFetching, error } = useGetMoviesQuery(
    `/${updatedEndpoint}/top_rated`
  );

  return (
    <section className="relative z-0 pb-12">
      <article className="flex items-center justify-between mb-4">
        <h2 className="py-2 text-lg font-medium">
          Top Rated{" "}
          <img
            src={starIcon}
            alt="starIcon"
            width={16}
            height={16}
            className="inline pb-1"
          />
        </h2>
        <SwitchTabs tabs={media_types} onSwitch={setEndpoint} />
      </article>
      <List data={data} isLoading={isFetching} endpoint={updatedEndpoint} />
    </section>
  );
};

export default TopRated;
