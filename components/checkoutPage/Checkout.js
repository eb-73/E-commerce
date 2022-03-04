import style from "./Checkout.module.css";
import TotalPrice from "../shopPage/TotalPrice";
const Checkout = (props) => {
  return (
    <div
      className={`w-100 py-3 d-flex flex-column flex-sm-row align-items-center align-items-sm-start`}
    >
      <main className={` ${style.checkhoutContent}`}>{props.children}</main>
      <div className={` mt-2 mb-5 d-sm-block d-none ${style.summary}`}>
        <h1>Order Summary</h1>
        <TotalPrice totalPrice={100} />
      </div>
    </div>
  );
};

export default Checkout;
