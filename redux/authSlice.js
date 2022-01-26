import { createSlice } from "@reduxjs/toolkit";
const auth = createSlice({
  name: "Auth",
  initialState: { isAuth: false },
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});
export const authAction = auth.actions;
export default auth;
