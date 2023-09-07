import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";

const timeFrame = ["Day", "Week"];

const Trending = () => {
  const [endpoint, setEndpoint] = useState("day");

  return (
    <section className="pb-12 relative z-0">
      <article className="flex justify-between items-center mb-4">
        <h2 className="mb-2 font-medium py-2">What's Trending</h2>
        <SwitchTabs tabs={timeFrame} onSwitch={setEndpoint} />
      </article>
      <List url={`/trending/all/${endpoint}`} />
    </section>
  );
};

export default Trending;
