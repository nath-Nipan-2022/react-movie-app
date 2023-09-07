import { useState } from "react";
import List from "../../../components/MoviesList";
import SwitchTabs from "../../../components/SwitchTabs";

const media_types = ["Movies", "TV Shows"];

const Popular = () => {
  const [endpoint, setEndpoint] = useState("Movies");

  let updatedEndpoint = "";
  if (endpoint === "TV Shows".toLowerCase()) {
    updatedEndpoint = "tv";
  } else {
    updatedEndpoint = "movie";
  }

  return (
    <section className="pb-12 relative z-0">
      <article className="flex justify-between items-center mb-4">
        <h2 className="mb-2 font-medium py-2">Popular</h2>
        <SwitchTabs tabs={media_types} onSwitch={setEndpoint} />
      </article>
      <List url={`/${updatedEndpoint}/popular`} endpoint={updatedEndpoint} />
    </section>
  );
};

export default Popular;
