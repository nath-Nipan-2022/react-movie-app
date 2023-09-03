import { configureStore } from "@reduxjs/toolkit";
import { moviesApi } from "./apis/moviesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { moviesSlice } from "./slices/moviesSlice";

const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    ImagesUrls: moviesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware),
});

setupListeners(store.dispatch);

export { store };
