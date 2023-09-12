import { useCallback, useEffect, useState } from "react";

const useSearchResults = (query, pageNum) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  const getSearchResults = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNum}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${
              import.meta.env.VITE_TMDB_API_ACCESS_TOKEN
            }`,
          },
        }
      );

      const res = await data.json();
      setResults((prev) => [...prev, ...res.results]);
      setIsLoading(false);
      setHasMore(Boolean(res.results.length));
    } catch (error) {
      setError(error);
    }
  }, [query, pageNum]);

  useEffect(() => {
    getSearchResults(pageNum);
  }, [pageNum, getSearchResults]);

  useEffect(() => {
    setResults([]);
  }, [query]);

  return {
    results,
    isLoading,
    error,
    hasMore,
  };
};
export { useSearchResults };
