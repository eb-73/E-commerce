import style from "./ShopingCartProduct.module.css";

import { TrashIcon } from "@heroicons/react/outline";
const ShopingCartProduct = () => {
  return (
    <div
      className={` py-4 d-flex justify-content-start align-items-center ${style.cartProduct}`}
    >
      <div
        className={`d-flex justify-content-center align-items-center ${style.image}`}
      >
        <img src="/productImage/product2.png" alt="CartProduct" />
      </div>
      <div
        className={`d-flex flex-column justify-content-around align-items-start mx-3 ${style.product}`}
      >
        <div className={`${style.name}`}>
          <h4>jocket</h4>
          <h5>T-Shirts</h5>
          <h5>White</h5>
          <h5>Size</h5>
        </div>
        <div className={`d-flex ${style.editBox}`}>
          <button
            type="button"
            className={`d-flex justify-content-center align-items-center  ${style.delete}`}
          >
            <TrashIcon className={style.deleteIcon} />
          </button>
          <div className={`d-flex mx-2 ${style.quantityBox}`}>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center ${style.quantityButton}`}
            >
              -
            </button>
            <h4
              className={`d-flex flex-column align-items-center justify-content-center ${style.quantity}`}
            >
              4
            </h4>
            <button
              type="button"
              className={`d-flex align-items-center justify-content-center ${style.quantityButton}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <h5 className={` ${style.price}`}>$2.22</h5>
    </div>
  );
};

export default ShopingCartProduct;
