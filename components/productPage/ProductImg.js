import style from "./ProductImg.module.css";
import Image from "next/image";
const ProductImg = (props) => {
  return (
    <div
      className={`carousel-item ${props.active && "active"} ${
        style.productImg
      } `}
    >
      {/* <img src={props.url} className="d-block mx-auto" /> */}
      <Image
        src={props.url}
        alt="product picture"
        layout="fill"
        objectFit="contain"
        priority={false}
        loading="eager"
      />
    </div>
  );
};

export default ProductImg;
