import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedComments: [],
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    likeComment: (state, action) => {
      const { commentId, userId } = action.payload;
      const existingLike = state.likedComments.find(
        (l) => l.commentId === commentId && l.userId === userId
      );
      if (!existingLike) {
        state.likedComments.push({ commentId, userId });
      }
    },
    unlikeComment: (state, action) => {
      const { commentId, userId } = action.payload;
      state.likedComments = state.likedComments.filter(
        (l) => !(l.commentId === commentId && l.userId === userId)
      );
    },
    resetComment: (state, action) => {
      state.likedComments = [];
    },
  },
});

export const { likeComment, unlikeComment, resetComment } = likeSlice.actions;

export default likeSlice.reducer;
