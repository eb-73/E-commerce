import style from "./ShopingCart.module.css";
import ShopingCartProduct from "./ShopingCartProduct";
import TotalPrice from "./TotalPrice";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
const ShopingCart = () => {
  const cart = useSelector((state) => state.Order.orderProducts);
  const total = useSelector((state) => state.Order.orderTotalPrice);
  const isEmpity = cart.length === 0;
  const router = useRouter();
  const pathName = router.pathname;
  const checkoutHandler = async () => {
    const session = await getSession();
    if (session) {
      router.push("/checkout/delivery");
    } else if (!session) {
      router.push(`/login?from=${pathName}`);
    }
  };
  return (
    <div
      className={`w-100 pt-5 pb-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start`}
    >
      <div className={` my-2 ${style.items}`}>
        <h1>Bag</h1>
        {isEmpity && (
          <div className="my-5 d-flex flex-column align-items-center">
            <h5 className="my-4 d-flex justify-content-center">
              YOUR BAG IS EMPTY
            </h5>
            <Link href="/">
              <button className="btn btn-sm btn-outline-secondary">
                Go To Products Page →
              </button>
            </Link>
          </div>
        )}
        {cart.map((product, index) => (
          <ShopingCartProduct
            key={index}
            id={product.productId}
            title={product.productTitle}
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
        <button
          className={`${style.checkoutButton}`}
          disabled={isEmpity}
          onClick={checkoutHandler}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShopingCart;
