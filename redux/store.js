import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import order from "./orderSlice";
const store = configureStore({
  reducer: { Auth: auth.reducer, Order: order.reducer },
});
export default store;
