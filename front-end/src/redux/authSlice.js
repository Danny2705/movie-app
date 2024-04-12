import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      localStorage.clear();
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    register: (state, action) => {
      localStorage.clear();
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.user = null;
      state.token = null;
    },
  },
});

export const { logIn, register, logout } = authSlice.actions;

export default authSlice.reducer;
