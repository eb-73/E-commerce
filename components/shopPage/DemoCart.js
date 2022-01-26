import style from "./DemoCart.module.css";
import { XIcon } from "@heroicons/react/solid";
import DemoCartProduct from "./DemoCartProduct";
import { createPortal } from "react-dom";
const DemoCart = (props) => {
  const closeCart = (e) => {
    if (e.target.id === "overlayCart") {
      props.closeShopingCart();
    } else {
      return;
    }
  };
  return createPortal(
    <div
      className={`  ${style.overlayCart}`}
      id="overlayCart"
      onClick={closeCart}
    >
      <form
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
            <h2>$141.54</h2>
          </div>
        </div>

        <div className={`py-2 px-3  ${style.cartItems}`}>
          <DemoCartProduct />
          <DemoCartProduct />
          <DemoCartProduct />
          <DemoCartProduct />
          <DemoCartProduct />
          <DemoCartProduct />
        </div>
        <button className={`${style.doneButton}`} type="submit">
          Done
        </button>
      </form>
    </div>,
    document.getElementById("myportal")
  );
};

export default DemoCart;
