import { createSlice, current } from "@reduxjs/toolkit";
const favorite = createSlice({
  name: "Favorite",
  initialState: { userId: null, favProducts: [] },
  reducers: {
    setInitial(state, action) {
      state.userId = action.payload.costumerId;
      state.favProducts = action.payload.data;
    },
    setFavorite(state, action) {
      state.userId = action.payload.costumerId;
      state.favProducts.push(action.payload.item);
    },

    remove(state, action) {
      const element = state.favProducts.find(
        (item) => item.productId === action.payload
      );
      if (element) {
        state.favProducts = state.favProducts.filter(
          (item) => item.productId !== action.payload
        );
      }
    },
    clear(state) {
      state.favProducts = [];
    },
  },
});
export const favoriteAction = favorite.actions;
export default favorite;
