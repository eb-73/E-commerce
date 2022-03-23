import style from "./OrderProduct.module.css";
import Image from "next/image";
const OrderProduct = (props) => {
  return (
    <li className={`d-flex p-2 align-items-center ${style.itemProduct}`}>
      <div className={style.imageWrapper}>
        <Image
          className={`d-flex mr-2 ${style.image}`}
          alt="product-pic"
          src={props.imgUrl}
          width={1728}
          height={2160}
          layout="responsive"
          priority={false}
          loading="eager"
        />
      </div>
      {/* <img src={props.imgUrl} className={`d-flex mx-2 ${style.image}`} /> */}
      <div className={`d-flex flex-column mx-2 ${style.info}`}>
        <h2 className={style.title}>{props.title}</h2>
        <h2>Color: {props.color}</h2>
        <h2>Size: {props.size}</h2>
        <h2>Qty: {props.quantity}</h2>
        <h2>${props.price}</h2>
      </div>
    </li>
  );
};

export default OrderProduct;
