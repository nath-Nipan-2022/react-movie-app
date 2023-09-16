import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";
import { useGetMoviesQuery } from "../../../store/apis/moviesApi";

const timeFrame = ["Day", "Week"];

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  const { data, isFetching, error } = useGetMoviesQuery(
    `/trending/all/${endpoint}`
  );

  return (
    <section className="relative z-0 pb-12">
      <article className="flex items-center justify-between mb-4">
        <h2 className="py-2 text-lg font-medium">What&apos;s Trending</h2>
        <SwitchTabs tabs={timeFrame} onSwitch={setEndpoint} />
      </article>
      <List data={data} isLoading={isFetching} />
      {error && error.message && error.message}
    </section>
  );
};

export default Trending;
