import style from "./ProductInfo.module.css";
const ProductInfo = (props) => {
  return (
    <div
      className={`pt-3 flex-column align-items-center justify-content-between ${props.className} ${style.productInfo}`}
    >
      <div
        className={`w-100 d-flex flex-row flex-sm-column justify-content-between justify-content-sm-between align-items-start mb-2 mb-sm-5 ${style.title}`}
      >
        <h2 className={style.name}>Jockets</h2>
        <h2 className={style.price}>$22</h2>
      </div>
      <div
        className={`d-flex flex-column align-items-center align-items-sm-start mb-2 ${style.detail}`}
      >
        <h4>Product Info</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
          commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus
          et magnis dis parturient montes, nascetur ridiculus mus. Donec quam
          felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
          consequat massa quis enim. Donec pede justo, fringilla vel, aliquet
          nec, vulputate
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
