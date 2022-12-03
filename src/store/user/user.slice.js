import { createSlice } from "@reduxjs/toolkit";

export const { actions: userActions, reducer: userReducer } = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    user:
      localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")),
  },
  reducers: {
    setUser: (state, { payload }) => {
      console.log(payload);
      state.user = payload.user;
      state.token = payload.accessToken;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("user", JSON.stringify(payload.user));
    },
  },
});
