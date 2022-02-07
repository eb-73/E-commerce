import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "Products",
  initialState: [],
  reducers: {
    setProducts(state, action) {
      action.payload.forEach((item) => {
        state.push(item);
      });
    },
  },
});
