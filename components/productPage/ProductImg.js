import style from "./ProductImg.module.css";

const ProductImg = (props) => {
  return (
    <div
      className={`carousel-item ${props.active && "active"} ${
        style.productImg
      } `}
    >
      <img src={props.url} className="d-block mx-auto" />
    </div>
  );
};

export default ProductImg;
