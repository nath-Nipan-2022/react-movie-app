import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import MovieCard from "../../components/MovieCard";
import Skeletons from "../../components/Skeletons";
import { useGetSearchResultsQuery } from "../../store/apis/moviesApi";
import { useInfiniteScroll } from "../../hook/useInfiniteScroll";

const SearchResults = () => {
  const [pageNum, setPageNum] = useState(1);
  const [results, setResults] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { query } = useParams();

  const { data, isFetching, error } = useGetSearchResultsQuery({
    query,
    pageNum,
  });

  useEffect(() => {
    if (pageNum === data?.total_pages) {
      setHasMore(false);
    }
    if (!isFetching) {
      if (pageNum !== 1) {
        setResults((prev) => [...prev, ...data.results]);
        return;
      }
      setResults(data.results);
    }
  }, [pageNum, data, isFetching]);

  // reset results
  useEffect(() => {
    setPageNum(1);
  }, [query]);

  const handleInfiniteScroll = () => {
    setPageNum((prev) => prev + 1);
  };

  const { lastElementRefFunc } = useInfiniteScroll(
    handleInfiniteScroll,
    isFetching,
    hasMore
  );

  const finalResults = results?.length > 0 ? results : data?.results;

  const renderResults = finalResults?.map((r, i) => {
    if (results?.length === i + 1) {
      return (
        <MovieCard
          key={r.id}
          movie={r}
          endpoint={r.endpoint}
          ref={lastElementRefFunc} //👈 lastElemRef
          className="shrink-0 bg-skeleton aspect-[1/1.35]"
        />
      );
    }

    return (
      <MovieCard
        key={r.id}
        movie={r}
        endpoint={r.endpoint}
        className="shrink-0 bg-skeleton aspect-[1/1.45]"
      />
    );
  });

  return (
    <main>
      <section className="pb-12">
        <Container>
          <div className="py-2 mb-2 font-medium">
            Search results for {`'${query}'`}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4 sm:gap-6 lg:gap-4 lg:grid-cols-5">
            {renderResults}
            {isFetching && renderSkeletons}
          </div>
          {!isFetching && results?.length <= 0 && <div>No results found</div>}
          {error && (
            <div className="font-bold text-center text-red-500">{error}</div>
          )}
        </Container>
      </section>
    </main>
  );
};

const renderSkeletons = Array(5)
  .fill(0)
  .map((_, i) => (
    <div key={i} className="rounded-xl aspect-[1/1.35] relative bg-[#d49aff69]">
      <article className="absolute inset-0 flex flex-col justify-between p-4 rounded-lg">
        <Skeletons className="w-10 h-3" />
        <div>
          <Skeletons className="w-full h-2 mb-2" />
          <Skeletons className="w-3/4 h-2 mb-3" />
          <div className="flex justify-between gap-3 mt-4">
            <Skeletons className="w-20 rounded-xl h-7" />
            <Skeletons className="rounded-full h-7 w-7" />
          </div>
        </div>
      </article>
    </div>
  ));

export default SearchResults;
