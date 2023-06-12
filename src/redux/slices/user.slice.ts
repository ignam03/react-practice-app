import { createSlice } from "@reduxjs/toolkit";

export interface UserLoginState {
  email: string;
  password: string;
  token: string;
}

const initialState = {
  email: "",
  fullName: "",
  token: "",
};

export const userSlice = createSlice({
  name: "'user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = "";
      state.fullName = "";
      state.token = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
