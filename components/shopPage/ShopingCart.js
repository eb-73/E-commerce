import style from "./ShopingCart.module.css";
import ShopingCartProduct from "./ShopingCartProduct";
import TotalPrice from "./TotalPrice";
import { useSelector } from "react-redux";
const ShopingCart = () => {
  const cart = useSelector((state) => state.Order.orderProducts);
  const total = useSelector((state) => state.Order.orderTotalPrice);
  return (
    <div
      className={`w-100 py-3  d-flex flex-column flex-sm-row align-items-center align-items-sm-start`}
    >
      <div className={` my-2 ${style.items}`}>
        <h1>Bag</h1>
        {cart.map((product, index) => (
          <ShopingCartProduct
            key={index}
            id={product.productId}
            quantity={product.quantity}
            imageUrl={product.imageUrl}
            color={product.color}
            size={product.size}
            price={product.productPrice}
          />
        ))}
      </div>
      <div className={` mt-2 mb-5 ${style.summary}`}>
        <h1>Summary</h1>
        <TotalPrice totalPrice={total} />
        <button className={`${style.checkoutButton}`}>Checkout</button>
      </div>
    </div>
  );
};

export default ShopingCart;
