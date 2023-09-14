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
    getMediaById: builder.query({
      query: ({ media_type, id }) => `/${media_type}/${id}`,
    }),
    getConfiguration: builder.query({
      query: () => `/configuration`,
    }),
    getMediaDetails: builder.query({
      // detailsQuery is for 'videos' or 'casts'
      query: ({ media_type, id, detailsQuery }) => {
        return `/${media_type}/${id}/${detailsQuery}`;
      },
    }),
    getSearchResults: builder.query({
      query: ({ query, pageNum }) => {
        return `search/multi?query=${query}&page=${pageNum}`;
      },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMediaByIdQuery,
  useGetConfigurationQuery,
  useGetMediaDetailsQuery,
  useGetSearchResultsQuery,
} = moviesApi;
export { moviesApi };
