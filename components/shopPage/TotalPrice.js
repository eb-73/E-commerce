import style from "./TotalPrice.module.css";
const TotalPrice = (props) => {
  return (
    <div className={` ${style.totalPrice}`}>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Subtotal</h4>
        <h4>${!!props.totalPrice ? props.totalPrice : "0.00"}</h4>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Estimated Shipping & Handling</h4>
        <h4>$0.00</h4>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <h4>Estimated Tax</h4>
        <h4>—</h4>
      </div>
      <div
        className={`d-flex align-items-center justify-content-between ${style.total}`}
      >
        <h4>Total</h4>
        <h4>${!!props.totalPrice ? props.totalPrice : "0.00"}</h4>
      </div>
    </div>
  );
};

export default TotalPrice;
