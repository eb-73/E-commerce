import style from "./ProductImg.module.css";
import img from "../../assets/product1.png";
import img2 from "../../assets/product2.png";
const ProductImg = (props) => {
  return (
    <div className={`carousel-item ${props.className} ${style.productImg} `}>
      <img src={props.url} className="d-block mx-auto" />
    </div>
  );
};

export default ProductImg;
