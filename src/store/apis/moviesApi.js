import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const moviesApi = createApi({
  tagTypes: ["movies"],
  reducerPath: "movies",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${import.meta.env.VITE_TMDB_API_ACCESS_TOKEN}`
      );
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (query) => `${query}`,
    }),
    getMovieById: builder.query({
      query: (id) => `/movie/${id}`,
    }),
    getConfiguration: builder.query({
      query: () => `/configuration`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useGetConfigurationQuery,
} = moviesApi;
export { moviesApi };
