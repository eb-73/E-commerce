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
            <input type="radio" id="xs" name="selector" />
            <label htmlFor="xs">XS</label>
            <input type="radio" id="s" name="selector" />
            <label htmlFor="s">S</label>
            <input type="radio" id="m" itemID name="selector" />
            <label htmlFor="m">M</label>
            <input type="radio" id="l" name="selector" />
            <label htmlFor="l">L</label>
            <input type="radio" id="xl" name="selector" />
            <label htmlFor="xl">XL</label>
            <input type="radio" id="xxl" itemID name="selector" />
            <label htmlFor="xxl">XXL</label>
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
            <input type="radio" id="brown" name="selector" />
            <label htmlFor="brown"></label>
            <input type="radio" id="blue" name="selector" />
            <label htmlFor="blue"></label>
            <input type="radio" id="black" itemID name="selector" />
            <label htmlFor="black"></label>
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
