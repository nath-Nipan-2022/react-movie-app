import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: [],

  reducers: {
    addToWatchList: (state, action) => {
      let hasItem = state.find((item) => item.id === action.payload.id);
      if (hasItem) {
        state.filter((item) => item.id !== hasItem.id);
        return;
      }
      state.push(action.payload);
    },
  },
});

export { watchListSlice };
export const { addToWatchList } = watchListSlice.actions;
