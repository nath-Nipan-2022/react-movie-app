import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";

const timeFrame = ["Day", "Week"];

const Trending = () => {
  const [selectedItem, setSelectedItem] = useState("day");

  return (
    <section className="mt-6 relative z-0">
      <article className="flex justify-between items-center mb-4">
        <h2 className="mb-2 font-medium py-2">What's Trending</h2>
        <SwitchTabs tabs={timeFrame} onSwitch={setSelectedItem} />
      </article>
      <List url={`/trending/all/${selectedItem}`} />
    </section>
  );
};

export default Trending;
