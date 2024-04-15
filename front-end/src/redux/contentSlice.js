import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letter: "Show All",
  currentPage: 1,
  totalPage: 1,
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLibraryRoute: (state, action) => {
      state.letter = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { setLibraryRoute, setCurrentPage, setTotalPage } =
  contentSlice.actions;

export default contentSlice.reducer;
