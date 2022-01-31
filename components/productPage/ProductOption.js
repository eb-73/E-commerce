import style from "./ProductOption.module.css";
import { HeartIcon } from "@heroicons/react/outline";
const ProductOption = (props) => {
  return (
    <div
      className={`pt-3  d-flex flex-column align-items-center align-items-sm-start justify-content-between ${style.producOption}`}
    >
      <div className={`w-100 ${style.option}`}>
        <div
          className={`w-100 d-flex justify-content-between align-items-center ${style.sizeTitle}`}
        >
          <h4>Choose Size</h4>
          <h5>Size Guide</h5>
        </div>
        <form className={`w-100 mt-2 ${style.sizeSelect}`}>
          <div
            className={`w-100  d-flex justify-content-start align-items-center  flex-wrap ${style.radioGroup}`}
          >
            {props.sizes.map((item, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={item.name}
                  name="selector"
                  disabled={item.quantity === "0" && true}
                />
                <label
                  htmlFor={item.name}
                >{`${item.name} (${item.quantity})`}</label>
              </div>
            ))}
          </div>
        </form>
        <div
          className={`w-100 d-flex justify-content-between align-items-center mt-4 ${style.colorTitle}`}
        >
          <h4>Choose Color</h4>
        </div>
        <form className={`w-100 mt-2 ${style.colorSelect}`}>
          <div
            className={`w-100 d-flex justify-content-start align-items-center flex-wrap ${style.radioGroup}`}
          >
            {props.colors.map((item, index) => (
              <div key={index}>
                <input type="radio" id={item} name="selector" />
                <label htmlFor={item} style={{ backgroundColor: item }}></label>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div
        className={`d-flex justify-content-between align-items-center w-100 my-2 ${style.optionButton}`}
      >
        <button className={` ${style.like}`}>
          <HeartIcon className={`w-75`} />
        </button>
        <button
          className={` ${style.checkout}`}
          onClick={props.openShopingCart}
        >
          Add to Card
        </button>
      </div>
    </div>
  );
};

export default ProductOption;
