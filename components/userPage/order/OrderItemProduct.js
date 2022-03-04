import style from "./OrderItemProduct.module.css";
const OrderItemProduct = () => {
  return (
    <li className={`d-flex my-2 px-2 align-items-center ${style.itemProduct}`}>
      <img className={`d-flex mx-2 ${style.image}`} />
      <div className={`d-flex flex-column mx-2 ${style.info}`}>
        <h2>title</h2>
        <h2>color</h2>
        <h2>size</h2>
      </div>
      <h2 className={`mx-auto ${style.quantity}`}>*quantity</h2>
      <h2 className={` ${style.price}`}>price</h2>
    </li>
  );
};

export default OrderItemProduct;
