import style from "./OrderItem.module.css";
import { useState } from "react";
import OrderItemProduct from "./OrderItemProduct";
const OrderItem = () => {
  const [show, setShow] = useState(false);
  const showHandler = () => {
    setShow((prevState) => !prevState);
  };
  return (
    <div className={` my-3 ${style.order}`}>
      <div
        className={`row align-items-center py-2 ${style.orderTitle} ${
          show && style.color
        }`}
      >
        <h4 className="col text-center">dsfsdfddf</h4>
        <h4 className="col text-center">22/02/03</h4>
        <h4 className="col text-center">pending</h4>
        <h4 className="col text-center">no</h4>
        <div className="col text-center">
          <button
            onClick={showHandler}
            className={` text-center ${style.orderButton}`}
          >
            detail
          </button>
        </div>
      </div>
      <ul className={` mx-auto ${style.orderBody} ${show && style.showBody}`}>
        <OrderItemProduct />
        <OrderItemProduct />
        <div className={` p-2 d-flex justify-content-between ${style.total}`}>
          <h2>total</h2>
          <h2>$5454</h2>
        </div>
      </ul>
    </div>
  );
};

export default OrderItem;
