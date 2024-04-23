import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letter: "Show All",
  searchPrompt: "",
  searchType: "",
  searchGenres: [],
  searchStatus: "",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLibraryRoute: (state, action) => {
      state.letter = action.payload;
    },
    setSearchPrompt: (state, action) => {
      state.searchPrompt = action.payload;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    },
    setSearchGenre: (state, action) => {
      state.searchGenres = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    },
    clearSearch: (state) => {
      state.searchPrompt = "";
      state.searchType = "";
      state.searchGenres = [];
      state.searchStatus = "";
    },
  },
});

export const {
  setLibraryRoute,
  setSearchPrompt,
  setSearchType,
  setSearchGenre,
  setSearchStatus,
  clearSearch,
} = contentSlice.actions;

export default contentSlice.reducer;
