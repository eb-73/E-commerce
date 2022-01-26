import style from "./ShopingCart.module.css";
import ShopingCartProduct from "./ShopingCartProduct";
import TotalPrice from "./TotalPrice";
const ShopingCart = () => {
  return (
    <div
      className={`w-100 py-3  d-flex flex-column flex-sm-row align-items-center align-items-sm-start`}
    >
      <div className={` my-2 ${style.items}`}>
        <h1>Bag</h1>
        <ShopingCartProduct />
        <ShopingCartProduct />
      </div>
      <div className={` mt-2 mb-5 ${style.summary}`}>
        <h1>Summary</h1>
        <TotalPrice />
        <button className={`${style.checkoutButton}`}>Checkout</button>
      </div>
    </div>
  );
};

export default ShopingCart;
