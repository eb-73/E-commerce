import style from "./ProductOption.module.css";
import { HeartIcon } from "@heroicons/react/outline";
import SizeForm from "./SizeForm";
import ColorForm from "./ColorForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderAction } from "../../redux/orderSlice";
import { useSession } from "next-auth/react";
import { favoriteAction } from "../../redux/favoriteSlice";
const ProductOption = (props) => {
  const [option, setOption] = useState({ size: "", color: "" });
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const isUser = !!session?.user;
  const userId = session?.user.userId;
  const setOptionHandler = (optionType, value) => {
    setOption((prevState) => ({ ...prevState, [optionType]: value }));
  };
  const formNotValid = !option.color || !option.size;
  //set favorite products
  const sendToFavoritesHandler = () => {
    if (status === "authenticated" && isUser) {
      dispatch(
        favoriteAction.setFavorite({
          costumerId: userId,
          item: {
            productId: props.productId,
            productTitle: props.title,
            productSubTitle: props.subTitle,
            imageUrl: props.imageUrl,
          },
        })
      );
    }
  };
  const sendToCartHandler = () => {
    // if  user not select color or size
    if (formNotValid) return;
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
            productTitle: props.title,
            quantity: 1,
            productPrice: props.price,
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
          costumerId: userId,
          date: new Date().toString(),
          status: "pending",
          item: {
            color: option.color,
            size: option.size,
            productTitle: props.title,
            quantity: 1,
            productPrice: props.price,
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
        <button className={` ${style.like}`} onClick={sendToFavoritesHandler}>
          <HeartIcon className={`w-75`} />
        </button>
        <button
          className={` ${style.checkout}`}
          onClick={sendToCartHandler}
          disabled={formNotValid}
        >
          Add to Card
        </button>
      </div>
    </div>
  );
};

export default ProductOption;
