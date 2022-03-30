import style from "./DemoCart.module.css";
import { XIcon } from "@heroicons/react/solid";
import DemoCartProduct from "./DemoCartProduct";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import Link from "next/link";
const DemoCart = (props) => {
  const cart = useSelector((state) => state.Order.orderProducts);
  const total = useSelector((state) => state.Order.orderTotalPrice);
  const closeCart = (e) => {
    if (e.target.id === "overlayCart") {
      props.closeShopingCart();
    }
  };
  return createPortal(
    <div
      className={`  ${style.overlayCart}`}
      id="overlayCart"
      onClick={closeCart}
    >
      <div
        className={`d-flex flex-column justify-content-start align-items-center ${style.shopingCart} `}
      >
        <div
          className={`pb-1 d-flex flex-column justify-content-between align-items-center ${style.header}`}
        >
          <div
            className={`my-2 px-3 d-flex justify-content-between align-items-center ${style.title}`}
          >
            <h2>Cart</h2>
            <XIcon
              className={style.closeIcon}
              onClick={props.closeShopingCart}
            />
          </div>
          <div
            className={` px-3 d-flex justify-content-between align-items-center ${style.totalPrice}`}
          >
            <h4>Total Item</h4>
            <h2>${total}</h2>
          </div>
        </div>

        <div className={`py-2 px-3  ${style.cartItems}`}>
          {cart.map((product, index) => (
            <DemoCartProduct
              key={index}
              id={product.productId}
              title={product.productTitle}
              color={product.color}
              size={product.size}
              quantity={product.quantity}
              imageUrl={product.imageUrl}
              price={product.productPrice}
            />
          ))}
        </div>
        <Link href="/cart" replace={true}>
          <button className={`${style.doneButton}`}>View bag</button>
        </Link>
      </div>
    </div>,
    document.getElementById("myportal")
  );
};

export default DemoCart;
