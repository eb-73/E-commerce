import { createSlice } from "@reduxjs/toolkit";
const auth = createSlice({
  name: "Auth",
  initialState: { isAuth: false, authenticatedEmail: null },
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.authenticatedEmail = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.authenticatedEmail = null;
    },
  },
});
export const authAction = auth.actions;
export default auth;
