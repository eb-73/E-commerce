import style from "./ProductInfo.module.css";
const ProductInfo = (props) => {
  return (
    <div
      className={`pt-3 flex-column align-items-center justify-content-between ${props.className} ${style.productInfo}`}
    >
      <div
        className={`w-100 d-flex flex-row flex-sm-column justify-content-between justify-content-sm-between align-items-start mb-2 mb-sm-5 ${style.titleBox}`}
      >
        <div className={style.name}>
          <h2 className={style.title}>{props.title}</h2>
          <h2 className={style.subTitle}>{props.subTitle}</h2>
        </div>
        <h2 className={style.price}>${props.price}</h2>
      </div>
      <div
        className={`d-flex flex-column align-items-center align-items-sm-start mb-2 ${style.detail}`}
      >
        <h4>Product Info</h4>
        <p>{props.description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
