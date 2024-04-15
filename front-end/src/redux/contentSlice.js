import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letter: "Show All",
  searchPrompt: ""
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLibraryRoute: (state, action) => {
      state.letter = action.payload;
    },
    setSearchPrompt: (state, action) => {
      state.searchPrompt = action.payload
    }
  },
});

export const { setLibraryRoute, setSearchPrompt } = contentSlice.actions;

export default contentSlice.reducer;
