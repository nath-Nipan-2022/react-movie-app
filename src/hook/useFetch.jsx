import { useCallback, useEffect, useState } from "react";

export const useFetch = (url, params) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const BASE_URL = "https://api.themoviedb.org/3/";

  const fetchMovies = useCallback(async () => {
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`,
    };

    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}${url}`, { headers, params });
      const data = await res.json();

      console.log(data);
      setIsLoading(false);
      setData(data);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  }, [url, params]);

  useEffect(() => {
    fetchMovies(url);
  }, [fetchMovies, url]);

  return {
    isLoading,
    data,
    error,
  };
};
