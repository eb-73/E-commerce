import style from "./OrderItemProduct.module.css";
import Image from "next/image";
const OrderItemProduct = (props) => {
  return (
    <li className={`d-flex p-3 align-items-center ${style.itemProduct}`}>
      <div className={style.imageWrapper}>
        <Image
          className={`d-flex mx-2 ${style.image}`}
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
        <h2>{props.title}</h2>
        <h2>{props.color}</h2>
        <h2>{props.size}</h2>
      </div>
      <h2 className={`mx-auto ${style.quantity}`}>×{props.quantity}</h2>
      <h2 className={` ${style.price}`}>${props.price}</h2>
    </li>
  );
};

export default OrderItemProduct;
