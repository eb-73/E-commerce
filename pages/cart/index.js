import ShopingCart from "../../components/shopPage/ShopingCart";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
const CartPage = () => {
  return <ShopingCart />;
};

export default CartPage;
