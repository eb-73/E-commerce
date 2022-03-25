import style from "./Orders.module.css";
import OrderItem from "./OrderItem";
import { getOrderDetail } from "../../../actions/actions";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.Auth.userId);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getOrderDetail(userId, "all")
        .then((data) => {
          setOrders(data.order);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setLoading(false);
        });
    }
  }, [userId]);
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
      {loading ? (
        <div className=" d-flex justify-content-center">
          <div className="mt-4 spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        orders.map((item, index) => (
          <OrderItem
            key={index}
            id={item._id.toString()}
            date={item.orderDate}
            status={item.orderStatus}
            isPaid={item?.payment?.isPaid}
            products={item.orderProducts}
            total={item.orderTotalPrice}
          />
        ))
      )}
    </div>
  );
};

export default Orders;
