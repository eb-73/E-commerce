import style from "./Orders.module.css";
import OrderItem from "./OrderItem";
const Orders = () => {
  return (
    <div className={`my-5 ${style.ordersWrapper}`}>
      <div
        className={`row w-100 my-4 mx-0 align-items-center ${style.orderTitles}`}
      >
        <h2 className="col text-center">OrderId</h2>
        <h2 className="col text-center">Date</h2>
        <h2 className="col text-center">Status</h2>
        <h2 className="col text-center">Paid</h2>
        <h2 className="col text-center">Detail</h2>
      </div>
      <OrderItem />
      <OrderItem />
    </div>
  );
};

export default Orders;
