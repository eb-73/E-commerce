import { createSlice } from "@reduxjs/toolkit";
const searchProducts = createSlice({
  name: "SearchProducts",
  initialState: { loading: false, products: [] },
  reducers: {
    setProducts(state, action) {
      state.products.splice(0, state.products.length);
      action.payload.forEach((item) => {
        state.products.push(item);
      });
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});
export const searchProductsAction = searchProducts.actions;
export default searchProducts;
