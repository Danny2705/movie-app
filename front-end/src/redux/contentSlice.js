import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  letter: "Show All",
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setLibraryRoute: (state, action) => {
      state.letter = action.payload;
    },
  },
});

export const { setLibraryRoute } = contentSlice.actions;

export default contentSlice.reducer;
