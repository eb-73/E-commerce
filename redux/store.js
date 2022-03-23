import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";
import order from "./orderSlice";
import searchProducts from "./searchProducts";
import productsInfo from "./productsSlice";
import favorite from "./favoriteSlice";
const store = configureStore({
  reducer: {
    Auth: auth.reducer,
    Order: order.reducer,
    SearchProducts: searchProducts.reducer,
    ProductsInfo: productsInfo.reducer,
    Favorite: favorite.reducer,
  },
});
export default store;
