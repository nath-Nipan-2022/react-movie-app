import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";
import { useGetMoviesQuery } from "../../../store/apis/moviesApi";

const media_types = ["Movies", "TV Shows"];

const Popular = () => {
  const [endpoint, setEndpoint] = useState("Movies");

  let updatedEndpoint = "";
  if (endpoint === "TV Shows".toLowerCase()) {
    updatedEndpoint = "tv";
  } else {
    updatedEndpoint = "movie";
  }

  const { data, isFetching, error } = useGetMoviesQuery(
    `/${updatedEndpoint}/popular`
  );

  return (
    <section className="relative z-0 pb-12">
      <article className="flex items-center justify-between mb-8">
        <h2 className="py-2 text-xl font-medium">Popular</h2>
        <SwitchTabs tabs={media_types} onSwitch={setEndpoint} />
      </article>
      <List data={data} isLoading={isFetching} endpoint={updatedEndpoint} />
    </section>
  );
};

export default Popular;
