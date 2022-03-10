import toast from "react-hot-toast";
import { orderAction } from "./orderSlice";
import { searchProductsAction } from "./searchProducts";
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
export const sendOrderListToDatabase = async (cart) => {
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
  if (!res.ok) {
    throw new Error(data.message);
  } else {
    return data;
  }
};
export const sendOrderDeliveryToDatabase = async (deliveryData) => {
  const res = await fetch("/api/order", {
    method: "PUT",
    body: JSON.stringify({
      costumerId: deliveryData.id,
      name: deliveryData.name,
      lastName: deliveryData.lastName,
      address: deliveryData.address,
      city: deliveryData.city,
      email: deliveryData.email,
      province: deliveryData.province,
      phone: deliveryData.phone,
      postalCode: deliveryData.postalCode,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  } else {
    return data;
  }
};
export const sendOrderListToLocal = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
export const getSearchProducts = (q, filter, category, size, color) => {
  return async (dispatch) => {
    dispatch(searchProductsAction.setLoading(true));
    const res = await fetch(
      `/api/searching?q=${q}&filter=${filter}&category=${category}&size=${size}&color=${color}`
    );
    const data = await res.json();
    const searchProducts = data.productsFilter.map((item) => ({
      id: item._id.toString(),
      product_title: item.product_title,
      prosuct_sub_title: item.prosuct_sub_title,
      product_description: item.product_description,
      pic_url: item.pic_url,
      product_price: item.product_price,
      category: item.category,
      sub_category: item.sub_category,
      size: item.size,
      color: item.color,
    }));
    dispatch(searchProductsAction.setProducts(searchProducts));
    dispatch(searchProductsAction.setLoading(false));
  };
};
