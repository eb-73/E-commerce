import style from "./DemoCartProduct.module.css";

import { TrashIcon } from "@heroicons/react/outline";
const DemoCartProduct = () => {
  return (
    <div
      className={` my-2 d-flex justify-content-start align-items-center ${style.cartProduct}`}
    >
      <div
        className={`d-flex justify-content-center align-items-center ${style.image}`}
      >
        <img src="/productImage/product1.png" alt="CartProduct" />
      </div>
      <div
        className={`d-flex flex-column justify-content-around align-items-start mx-3 ${style.product}`}
      >
        <div className={`${style.name}`}>
          <h4>jocket</h4>
          <h5>$2.22</h5>
        </div>
        <div className={`d-flex ${style.quantityBox}`}>
          <button
            type="button"
            className="d-flex flex-column align-items-center"
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
            className="d-flex flex-column align-items-center"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className={`d-flex justify-content-center align-items-center ${style.close}`}
      >
        <TrashIcon className={style.closeIcon} />
      </button>
    </div>
  );
};

export default DemoCartProduct;
