import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import order from "./orderSlice";
import searchProducts from "./searchProducts";
const store = configureStore({
  reducer: {
    Auth: auth.reducer,
    Order: order.reducer,
    SearchProducts: searchProducts.reducer,
  },
});
export default store;
