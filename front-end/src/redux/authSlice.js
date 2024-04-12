import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user"),
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    register: (state, action) => {
      localStorage.setItem("user", action.payload.user);
      localStorage.setItem("token", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
    },
  },
});

export const { logIn, register, logout } = authSlice.actions;

export default authSlice.reducer;
