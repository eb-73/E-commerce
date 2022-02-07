import style from "./ShopingCartProduct.module.css";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { orderAction } from "../../redux/orderSlice";
const ShopingCartProduct = (props) => {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(
      orderAction.remove({ id: props.id, size: props.size, color: props.color })
    );
  };
  const incrementHandler = () => {
    dispatch(
      orderAction.increment({
        id: props.id,
        size: props.size,
        color: props.color,
      })
    );
  };
  const decrementHandler = () => {
    dispatch(
      orderAction.decrement({
        id: props.id,
        size: props.size,
        color: props.color,
      })
    );
  };
  return (
    <div
      className={` py-4 d-flex justify-content-start align-items-center ${style.cartProduct}`}
    >
      <div
        className={`d-flex justify-content-center align-items-center ${style.image}`}
      >
        <img src={props.imageUrl} alt="CartProduct" />
      </div>
      <div
        className={`d-flex flex-column justify-content-around align-items-start mx-3 ${style.product}`}
      >
        <div className={`${style.name}`}>
          <h4>jocket</h4>
          <h5>T-Shirts</h5>
          <h5>{props.color}</h5>
          <h5>{props.size}</h5>
        </div>
        <div className={`d-flex ${style.editBox}`}>
          <button
            type="button"
            onClick={removeHandler}
            className={`d-flex justify-content-center align-items-center  ${style.delete}`}
          >
            <TrashIcon className={style.deleteIcon} />
          </button>
          <div className={`d-flex mx-2 ${style.quantityBox}`}>
            <button
              type="button"
              onClick={decrementHandler}
              className={`d-flex align-items-center justify-content-center ${style.quantityButton}`}
            >
              -
            </button>
            <h4
              className={`d-flex flex-column align-items-center justify-content-center ${style.quantity}`}
            >
              {props.quantity}
            </h4>
            <button
              type="button"
              onClick={incrementHandler}
              className={`d-flex align-items-center justify-content-center ${style.quantityButton}`}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <h5 className={` ${style.price}`}>${props.price}</h5>
    </div>
  );
};

export default ShopingCartProduct;
