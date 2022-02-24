import { createSlice } from "@reduxjs/toolkit";

const productsInfo = createSlice({
  name: "ProductsInfo",
  initialState: [],
  reducers: {
    setProductsInfo(state, action) {
      const index = state.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index >= 0) {
        state[index] = action.payload;
      } else state.push(action.payload);
    },
  },
});
export const productsInfoAction = productsInfo.actions;
export default productsInfo;
