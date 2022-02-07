import { orderAction } from "./orderSlice";
export const getOrderListFromDatabase = (authenticatedEmail) => {
  return async (dispatch) => {
    console.log("get order");
    fetch(`/api/order/${authenticatedEmail}`)
      .then((res) => res.json())
      .then((data) => {
        const { order } = data;
        if (order) {
          console.log("order is in database");
          dispatch(
            orderAction.setInitialOrder({
              orderId: order._id.toString(),
              costumerId: order.costumerId,
              date: order.orderDate,
              status: order.orderStatus,
              totalPrice: order.orderTotalPrice,
              items: order.orderProducts,
            })
          );
        } else if (!order && data.orderId) {
          console.log("not order in database", data.orderId);
          dispatch(
            orderAction.setOrderId({
              orderId: data.orderId,
              costumerId: authenticatedEmail,
              orderStatus: "pending",
            })
          );
          return;
        }
      })
      .catch((err) => console.log("error message", err));
  };
};
export const getOrderListFromLocal = () => {
  return async (dispatch) => {
    const cart = localStorage.getItem("cart");
    const order = JSON.parse(cart);
    if (!order) {
      return;
    }
    dispatch(
      orderAction.setInitialOrder({
        orderId: null,
        costumerId: order.costumerId,
        date: order.orderDate,
        status: order.orderStatus,
        totalPrice: order.orderTotalPrice,
        items: order.orderProducts,
      })
    );
  };
};
export const sendOrderListToDatabase = (cart) => {
  return async (dispatch) => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        body: JSON.stringify({
          orderId: cart.orderId,
          costumerId: cart.costumerId,
          orderDate: cart.orderDate,
          orderStatus: cart.orderStatus,
          orderTotalPrice: cart.orderTotalPrice,
          orderProducts: cart.orderProducts,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data.message);
    } catch (err) {
      console.log(err.message);
    }
  };
};
export const sendOrderListToLocal = (cart) => {
  return async (dispatch) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };
};
