import style from "./ProductOption.module.css";
import { HeartIcon } from "@heroicons/react/outline";
import SizeForm from "./SizeForm";
import ColorForm from "./ColorForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderAction } from "../../redux/orderSlice";
import { useSession } from "next-auth/react";
const ProductOption = (props) => {
  const [option, setOption] = useState({ size: "", color: "" });
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const isUser = !!session?.user;
  const setOptionHandler = (optionType, value) => {
    setOption((prevState) => ({ ...prevState, [optionType]: value }));
  };
  const sendToCartHandler = () => {
    //if user not login
    if (status === "unauthenticated" && !isUser) {
      dispatch(
        orderAction.setOrder({
          costumerId: "Guest",
          date: new Date().toString(),
          status: "pending",
          item: {
            color: option.color,
            size: option.size,
            quantity: 1,
            productPrice: props.productPrice,
            productId: props.productId,
            imageUrl: props.imageUrl,
          },
        })
      );
    }
    //
    //if user is login
    else if (status === "authenticated" && isUser) {
      dispatch(
        orderAction.setOrder({
          costumerId: session.user.email,
          date: new Date().toString(),
          status: "pending",
          item: {
            color: option.color,
            size: option.size,
            quantity: 1,
            productPrice: props.productPrice,
            productId: props.productId,
            imageUrl: props.imageUrl,
          },
        })
      );
    }

    props.openShopingCart();
  };
  return (
    <div
      className={`pt-3  d-flex flex-column align-items-center align-items-sm-start justify-content-between ${style.producOption}`}
    >
      <div className={`w-100 mb-2 mb-sm-5 ${style.option}`}>
        <div
          className={`w-100 d-flex justify-content-between align-items-center ${style.sizeTitle}`}
        >
          <h4>Choose Size</h4>
          <h5>Size Guide</h5>
        </div>
        <SizeForm
          sizes={props.sizes}
          setSize={setOptionHandler.bind(null, "size")}
        />
        <div
          className={`w-100 d-flex justify-content-between align-items-center mt-4 ${style.colorTitle}`}
        >
          <h4>Choose Color</h4>
        </div>
        <ColorForm
          colors={props.colors}
          setColor={setOptionHandler.bind(null, "color")}
        />
      </div>
      <div
        className={`d-flex justify-content-between align-items-center w-100 my-2 ${style.optionButton}`}
      >
        <button className={` ${style.like}`}>
          <HeartIcon className={`w-75`} />
        </button>
        <button className={` ${style.checkout}`} onClick={sendToCartHandler}>
          Add to Card
        </button>
      </div>
    </div>
  );
};

export default ProductOption;
