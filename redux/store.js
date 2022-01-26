import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
const store = configureStore({
  reducer: auth.reducer,
});
export default store;
