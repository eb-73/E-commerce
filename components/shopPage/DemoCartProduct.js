import style from "./DemoCartProduct.module.css";
import { TrashIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { orderAction } from "../../redux/orderSlice";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DemoCartProduct = (props) => {
  const dispatch = useDispatch();

  const { data, error } = useSWR(
    `/api/product/productInfo?id=${props.id}`,
    fetcher
  );
  let maxQuantity;
  if (data) {
    const index = data.productInfo.size.findIndex((i) => i.name === props.size);
    maxQuantity = data.productInfo.size[index].quantity;
  }
  // if quantity change in server
  if (data && props.quantity > data?.productInfo.size[index].quantity) {
    dispatch(
      orderAction.decrement({
        id: props.id,
        size: props.size,
        color: props.color,
        step: props.quantity - data.productInfo.size[index].quantity,
      })
    );
  } else if (data & (data?.productInfo.size[index].quantity == 0)) {
    dispatch(
      orderAction.remove({
        id: props.id,
        size: props.size,
        color: props.color,
      })
    );
  }
  // useEffect(() => {
  //   fetch(`/api/product/productInfo?id=${props.id}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const index = data.productInfo.size.findIndex(
  //         (i) => i.name === props.size
  //       );
  //       setProductInfo({
  //         title: data.productInfo.product_title,
  //         maxQuantity: data.productInfo.size[index].quantity,
  //       });
  //     });
  // }, [props.id]);
  const removeHandler = () => {
    dispatch(
      orderAction.remove({ id: props.id, size: props.size, color: props.color })
    );
  };
  const incrementHandler = () => {
    if (props.quantity < maxQuantity) {
      dispatch(
        orderAction.increment({
          id: props.id,
          size: props.size,
          color: props.color,
          step: 1,
        })
      );
    }
  };
  const decrementHandler = () => {
    dispatch(
      orderAction.decrement({
        id: props.id,
        size: props.size,
        color: props.color,
        step: 1,
      })
    );
  };
  return (
    <div
      className={` my-2 d-flex justify-content-start align-items-center ${style.cartProduct}`}
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
          <h4>{props.title || "..."}</h4>
          <h5>${props.price}</h5>
        </div>
        <div className={`d-flex ${style.quantityBox}`}>
          <button
            type="button"
            onClick={decrementHandler}
            className="d-flex justify-content-center align-items-center"
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
            className="d-flex justify-content-center align-items-center"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={removeHandler}
        className={`d-flex justify-content-center align-items-center ${style.close}`}
      >
        <TrashIcon className={style.closeIcon} />
      </button>
    </div>
  );
};

export default DemoCartProduct;
