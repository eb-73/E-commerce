import style from "./Checkout.module.css";
import TotalPrice from "../shopPage/TotalPrice";
import { useSelector } from "react-redux";
const Checkout = (props) => {
  const { pageName } = props;
  const total = useSelector((state) => state.Order.orderTotalPrice);
  return (
    <div
      className={`w-100 py-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start`}
    >
      <main
        className={` ${style.checkhoutContent} ${
          pageName === "order-complete" && "w-100"
        }`}
      >
        {props.children}
      </main>
      {(pageName === "delivery" || pageName === "payment") && (
        <div className={` mt-2 mb-5 d-sm-block d-none ${style.summary}`}>
          <h1>Order Summary</h1>
          <TotalPrice totalPrice={total} />
        </div>
      )}
    </div>
  );
};

export default Checkout;
