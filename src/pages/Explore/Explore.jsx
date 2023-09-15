import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useState } from "react";
import { chevron } from "../../assets/icons";

const genresArray = [
  { label: "Action", value: "action" },
  { label: "Animation", value: "animation" },
  { label: "Crime", value: "crime" },
  { label: "Comedy", value: "comedy" },
  { label: "Thrill", value: "thrill" },
];

const Explore = () => {
  const [openSelect, setOpenSelect] = useState(false);
  const [genres, setGenres] = useState([]);
  const { media_type } = useParams();

  const handleChange = (genre) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((gen) => gen.label !== genre.label));
      return;
    }
    setGenres([...genres, genre]);
  };

  const renderSelectedGenres = genres.map((genre) => (
    <span
      key={genre.label}
      className="px-2.5 h-5 grid place-items-center text-xs bg-gray-900 text-gray-200 rounded-md"
    >
      {genre.label}
    </span>
  ));

  let title = media_type === "tv" ? "TV Shows" : "Movies";

  return (
    <main className="min-h-screen">
      <Container className={"px-6"}>
        <div className="mb-4">
          Explore <span className="text-orange-300">{title}</span>
        </div>

        <div
          className={`text-sm text-gray-300 relative rounded-lg border border-gray-700 outline-none cursor-pointer transition bg-skeleton h-8 ${
            openSelect ? "overflow-visible" : "overflow-hidden"
          }`}
          name="genres"
          id="genres"
        >
          <div
            onClick={() => setOpenSelect((prev) => !prev)}
            className="p-[5px] px-3 flex justify-between"
          >
            {genres.length > 0 && (
              <div className="flex gap-2">{renderSelectedGenres}</div>
            )}
            {!genres.length && "Select Genres"}

            <img
              src={chevron}
              alt="chevron"
              width={12}
              height={12}
              className={`transition duration-300 ${
                openSelect ? "-rotate-180" : "rotate"
              }`}
            />
          </div>

          <div className="py-1 mt-1 overflow-hidden text-gray-200 rounded-lg bg-skeleton">
            {genresArray.map((g) => {
              return (
                <div
                  className="p-[5px] px-3 border-b border-gray-700 last:border-0 hover:bg-white/10 flex gap-4 justify-between items-center"
                  key={g.value}
                  value={g.value}
                  onClick={() => handleChange(g)}
                >
                  {g.label}
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    checked={genres.some((gen) => gen.label === g.label)}
                    className={`w-3 h-3 accent-accent-color`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
};
export default Explore;
