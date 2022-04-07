import { createSlice } from "@reduxjs/toolkit";

const order = createSlice({
  name: "Order",
  initialState: {
    orderId: null,
    costumerId: null,
    orderDate: null,
    orderStatus: null,
    orderTotalPrice: null,
    orderProducts: [],
  },
  reducers: {
    setOrderId(state, action) {
      state.orderId = action.payload.orderId;
      state.costumerId = action.payload.costumerId;
      state.orderStatus = action.payload.orderStatus;
    },
    clearOrder(state) {
      state.orderId = null;
      state.costumerId = null;
      state.orderDate = null;
      state.orderStatus = null;
      state.orderTotalPrice = null;
      state.orderProducts = [];
    },
    setInitialOrder(state, action) {
      state.orderId = action.payload.orderId;
      state.costumerId = action.payload.costumerId;
      state.orderDate = action.payload.date;
      state.orderStatus = action.payload.status;
      state.orderTotalPrice = action.payload.totalPrice;
      state.orderProducts = action.payload.items;
    },
    mergeInitialOrder(state, action) {
      if (state.orderProducts.length === 0) {
        state.orderId = action.payload.orderId;
        state.costumerId = action.payload.costumerId;
        state.orderDate = action.payload.date;
        state.orderStatus = action.payload.status;
        state.orderTotalPrice = action.payload.totalPrice;
        state.orderProducts = action.payload.items;
      } else if (state.orderProducts.length > 0) {
        state.orderId = action.payload.orderId;
        state.costumerId = action.payload.costumerId;
        state.orderTotalPrice =
          +state.orderTotalPrice + +action.payload.totalPrice;
        //check if items is array of cart
        action.payload.items.forEach((element) => {
          let flag = false;
          state.orderProducts.forEach((item, index) => {
            if (
              item.productId === element.productId &&
              item.color === element.color &&
              item.size === element.size
            ) {
              state.orderProducts[index].quantity =
                +state.orderProducts[index].quantity + +element.quantity;
              flag = true;
            }
          });
          if (!flag) {
            state.orderProducts.push(element);
          }
        });
      }
    },
    setOrder(state, action) {
      if (state.orderProducts.length === 0) {
        state.costumerId = action.payload.costumerId;
        state.orderDate = action.payload.date;
        state.orderStatus = action.payload.status;
        state.orderTotalPrice =
          +state.orderTotalPrice + +action.payload.item.productPrice;
        state.orderProducts.push(action.payload.item);
      } else if (state.orderProducts.length > 0) {
        let flag = false;
        //check if product in order list
        state.orderProducts.forEach((item, index) => {
          if (
            item.productId === action.payload.item.productId &&
            item.color === action.payload.item.color &&
            item.size === action.payload.item.size
          ) {
            flag = true;
          }
        });
        //product is in order list
        if (flag) {
          return;
        }
        state.costumerId = action.payload.costumerId;
        state.orderTotalPrice =
          +state.orderTotalPrice + +action.payload.item.productPrice;
        state.orderProducts.push(action.payload.item);
      }
    },
    increment(state, action) {
      const item = state.orderProducts.find(
        (item) =>
          item.productId === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (item) {
        item.quantity = item.quantity + action.payload.step;
        state.orderTotalPrice += action.payload.step * +item.productPrice;
      }
    },
    decrement(state, action) {
      const item = state.orderProducts.find(
        //check for product with same id but in color and size is diffrent
        (item) =>
          item.productId === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (item && item.quantity > 1) {
        item.quantity = item.quantity - action.payload.step;
        state.orderTotalPrice -= action.payload.step * +item.productPrice;
      }
    },
    remove(state, action) {
      const item = state.orderProducts.find(
        //check for product with same id but in color and size is diffrent
        (item) =>
          item.productId === action.payload.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );
      if (item) {
        state.orderProducts = state.orderProducts.filter((item) => {
          //check for product with same id but color and size is diffrent or product with diffrent id
          if (
            item.productId === action.payload.id &&
            (item.color !== action.payload.color ||
              item.size !== action.payload.size)
          ) {
            return true;
          } else if (item.productId !== action.payload.id) return true;
        });
        state.orderTotalPrice -= +item.productPrice * +item.quantity;
      }
    },
  },
});
export const orderAction = order.actions;
export default order;
