import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import {
  useGetFilteredDataQuery,
  useGetGenresQuery,
} from "../../store/apis/moviesApi";
import MovieCard from "../../components/MovieCard";
import Select from "../../components/Select";
import { useInfiniteScroll } from "../../hook/useInfiniteScroll";

const sortByData = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
  const [genres, setGenres] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [results, setResults] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { media_type } = useParams();

  const { data: genresData } = useGetGenresQuery(media_type);

  let params = {};
  if (genres.length > 0) {
    params.with_genres = genres.map((g) => g.id).join(",");
  }
  if (sortBy) {
    params.sort_by = sortBy;
  }

  const { data: filteredData, isFetching } = useGetFilteredDataQuery([
    `/discover/${media_type}?page=${pageNum}`,
    params,
  ]);

  const handleGenresChange = (selectedGenres) => {
    setGenres(selectedGenres);
    // reset
    setPageNum(1);
    setResults([]);
  };

  const handleSortByChange = (item) => {
    setSortBy(item.value);
    // reset
    setPageNum(1);
    setResults([]);
  };

  // Infinite Scrolling
  const handleScroll = () => setPageNum((prev) => prev + 1);
  const { lastElementRefFunc } = useInfiniteScroll(
    handleScroll,
    isFetching,
    hasMore
  );

  useEffect(() => {
    if (pageNum === filteredData?.total_pages) {
      setHasMore(false);
      return;
    }
    // only add the data if fetching is done.
    if (!isFetching) {
      if (pageNum !== 1) {
        setResults((prev) => [...prev, ...filteredData.results]);
        return;
      }
      setResults(filteredData.results);
    }
  }, [filteredData, pageNum, isFetching]);

  useEffect(() => {
    setPageNum(1);
    setHasMore(true);
  }, [media_type]);

  let finalData = results || filteredData?.results;

  const renderData = finalData?.map((r, i, arr) => {
    if (i === arr.length - 1) {
      return (
        <MovieCard
          key={r.id}
          movie={r}
          endpoint={media_type}
          ref={lastElementRefFunc}
          className="shrink-0 bg-skeleton aspect-[1/1.35]"
        />
      );
    }
    return (
      <MovieCard
        key={r.id}
        movie={r}
        endpoint={media_type}
        className="shrink-0 bg-skeleton aspect-[1/1.35]"
      />
    );
  });

  let title = media_type === "tv" ? "TV Shows" : "Movies";

  return (
    <main className="min-h-screen">
      <Container className={"px-6"}>
        <div className="mb-8 sm:flex sm:justify-between sm:items-center">
          <h2 className="mb-2 sm:mb-0">
            Explore <span className="text-orange-300">{title}</span>
          </h2>
          <div className="flex flex-col gap-2 sm:items-center sm:flex-row sm:gap-4">
            <Select
              data={genresData?.genres?.slice(0, 10)}
              onChange={handleGenresChange}
              isMultiSelect={true}
              renderValue={(v) => v?.id}
              renderOption={(o) => o?.name}
              title={"Select Genres"}
            />

            <Select
              data={sortByData}
              onChange={handleSortByChange}
              renderValue={(v) => v?.value}
              renderOption={(o) => o?.label}
              title={"Sort By"}
            />
          </div>
        </div>

        <section className="mt-4">
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6 lg:gap-5 lg:grid-cols-5">
            {renderData}
          </div>

          {/* Loader */}
          {isFetching && (
            <div className="grid h-96 place-items-center">
              <div>
                <span className="w-12 h-12 border-[5px] border-indigo-300 border-b-transparent rounded-full inline-block animate-spin"></span>
              </div>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
};
export default Explore;
