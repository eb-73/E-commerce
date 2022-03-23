import style from "./OrderItem.module.css";
import { useState } from "react";
import OrderItemProduct from "./OrderItemProduct";
const OrderItem = (props) => {
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
        <h4 className="col text-center">{props.id}</h4>
        <h4 className="col text-center">
          {new Date(props.date).toLocaleString()}
        </h4>
        <h4 className="col text-center">{props.status}</h4>
        <h4 className="col text-center">{props.isPaid ? "yes" : "no"}</h4>
        <div className={`col text-center ${style.buttonWrapper}`}>
          <button
            onClick={showHandler}
            className={` text-center ${style.orderButton}`}
          >
            detail
          </button>
        </div>
      </div>
      <ul className={` mx-auto ${style.orderBody} ${show && style.showBody}`}>
        {props.products.map((item, index) => (
          <OrderItemProduct
            key={index}
            title={item.productTitle}
            color={item.color}
            size={item.size}
            quantity={item.quantity}
            price={item.productPrice}
            imgUrl={item.imageUrl}
          />
        ))}
        <div className={` p-2 d-flex justify-content-between ${style.total}`}>
          <h2>Total</h2>
          <h2>${props.total}</h2>
        </div>
      </ul>
    </div>
  );
};

export default OrderItem;
