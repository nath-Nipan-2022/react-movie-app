import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urls: {},
};

const moviesSlice = createSlice({
  name: "Movies",
  initialState,

  reducers: {
    setImgUrls: (state, action) => {
      state.urls = action.payload;
    },
  },
});

export const { setImgUrls } = moviesSlice.actions;
export { moviesSlice };
