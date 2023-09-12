import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import MovieCard from "../../components/MovieCard";
import Skeletons from "../../components/Skeletons";
import { useSearchResults } from "../../hook/useSearchResults";

const SearchResults = () => {
  const [pageNum, setPageNum] = useState(1);
  const { query } = useParams();
  const observer = useRef();

  const { results, isLoading, error, hasMore } = useSearchResults(
    query,
    pageNum
  );

  const lastElementRefFunc = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const renderResults = results?.map((r, i) => {
    if (results?.length === i + 1) {
      return (
        <MovieCard
          key={r.id}
          movie={r}
          endpoint={r.endpoint}
          ref={lastElementRefFunc} //👈 lastElemRef
          className="shrink-0 bg-skeleton aspect-[1/1.45]"
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
      <section className="pt-6 pb-12">
        <Container className={"px-8"}>
          <div className="py-2 mb-2 font-medium">
            Search results for {`'${query}'`}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 sm:gap-6 lg:gap-4 lg:grid-cols-4">
            {renderResults}
            {isLoading && renderSkeletons}
          </div>
          {results?.length <= 0 && <div>No results found</div>}
          {error && (
            <div className="font-bold text-center text-red-500">{error}</div>
          )}
        </Container>
      </section>
    </main>
  );
};

const renderSkeletons = Array(10)
  .fill(0)
  .map((_, i) => (
    <div key={i} className="rounded-xl aspect-[1/1.5] relative bg-[#d49aff69]">
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
