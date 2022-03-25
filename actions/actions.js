import { favoriteAction } from "../redux/favoriteSlice";
import { orderAction } from "../redux/orderSlice";
import { searchProductsAction } from "../redux/searchProducts";
export const getOrderListFromDatabase = (userId, status) => {
  return async (dispatch) => {
    //get order in dtabase if exixst
    fetch(`/api/order/${userId}/${status}`)
      .then((res) => res.json())
      .then((data) => {
        const { order } = data;
        const localCart = localStorage.getItem("cart");
        console.log("localCart", localCart);
        //order is in guest mode and login to your account
        if (localCart && order) {
          localStorage.removeItem("cart");
          console.log("order is in database mergeinitial");
          dispatch(
            orderAction.mergeInitialOrder({
              orderId: order._id.toString(),
              costumerId: order.costumerId,
              date: order.orderDate,
              status: order.orderStatus,
              totalPrice: order.orderTotalPrice,
              items: order.orderProducts,
            })
          );
        }
        //get order when is loged in your account
        else if (!localCart && order) {
          console.log("order is in database setinitial");
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
        }
        //if order not exist in database, create pending order and set id
        else if (!order && data.orderId) {
          console.log("not order in database", data.orderId);
          dispatch(
            orderAction.setOrderId({
              orderId: data.orderId,
              costumerId: userId,
              orderStatus: "pending",
            })
          );
          return;
        }
      })
      .catch((err) => console.log("error message", err));
  };
};
export const getOrderDetail = async (id, status) => {
  const res = await fetch(`/api/order/${id}/${status}`);
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  } else {
    return result;
  }
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
  const res = await fetch("/api/order?dataFor=delivery", {
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
export const sendOrderPaymentToDatabase = async (paymentData) => {
  const res = await fetch("/api/order?dataFor=payment", {
    method: "PUT",
    body: JSON.stringify({
      costumerId: paymentData.id,
      isPaid: true,
      paidAt: new Date(),
      paymentMethod: paymentData.method,
      email: paymentData.email,
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
      productTitle: item.productTitle,
      productSubTitle: item.productSubTitle,
      productDescription: item.productDescription,
      picUrl: item.picUrl,
      productPrice: item.productPrice,
      category: item.category,
      subCategory: item.subCategory,
      size: item.size,
      color: item.color,
      productDate: item.productDate,
    }));
    dispatch(searchProductsAction.setProducts(searchProducts));
    dispatch(searchProductsAction.setLoading(false));
  };
};
export const getFavoriteFromDatabase = (userId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/favorite?id=${userId}`);
    const result = await res.json();
    if (res.ok && result && result.favorite) {
      dispatch(
        favoriteAction.setInitial({
          costumerId: userId,
          data: result.favorite,
        })
      );
    } else {
      return;
    }
  };
};
export const sendFavoriteToDatabase = async (favData) => {
  console.log("send fav to database in action", favData);
  const res = await fetch("/api/favorite", {
    method: "PUT",
    body: JSON.stringify({
      id: favData.userId,
      data: favData.favProducts,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  } else {
    return result;
  }
};
export const createUser = async (userData) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something is wrong");
  }
  return data;
};
