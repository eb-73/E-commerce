import style from "./OrderList.module.css";
import OrderProduct from "./OrderProduct";
const OrderList = ({ products }) => {
  return (
    <ul className={`mt-2 mb-5 ${style.orderList}`}>
      <h5>products:</h5>
      {products.map((item, index) => (
        <OrderProduct
          key={index}
          title={item.productTitle}
          imgUrl={item.imageUrl}
          color={item.color}
          size={item.size}
          quantity={item.quantity}
          price={item.productPrice}
        />
      ))}
    </ul>
  );
};

export default OrderList;
