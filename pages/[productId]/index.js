import style from "./index.module.css";
import ProductInfo from "../../components/productPage/ProductInfo";
import ImageSlider from "../../components/productPage/ImageSlider";
import ProductOption from "../../components/productPage/ProductOption";
import DemoCart from "../../components/shopPage/DemoCart";
import { CSSTransition } from "react-transition-group";

import { useState } from "react";
const Product = () => {
  const [showCart, setShowCart] = useState(false);
  const openCartHandler = () => {
    setShowCart(true);
  };
  const closeCartHandler = () => {
    setShowCart(false);
  };
  return (
    <div className={`w-100 h-100 d-flex flex-column flex-sm-row`}>
      <ProductInfo className="d-none d-sm-flex" />
      <ImageSlider />
      <ProductInfo className="d-flex d-sm-none" />
      <ProductOption openShopingCart={openCartHandler} />
      <CSSTransition
        in={showCart}
        timeout={500}
        unmountOnExit
        mountOnEnter
        classNames={{
          enter: style.showModal,
          enterActive: style.showModalActive,
          exit: style.hideModal,
          exitActive: style.hideModalActive,
        }}
      >
        <DemoCart closeShopingCart={closeCartHandler} />
      </CSSTransition>
    </div>
  );
};

export default Product;
