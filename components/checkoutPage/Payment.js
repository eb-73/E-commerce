import style from "./Payment.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState } from "react";
import PaymentForm from "./PaymentForm";
const Payment = () => {
  const [showBox, setShowBox] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("pm1");
  const toggleBox = () => {
    setShowBox((prevState) => !prevState);
  };
  const changeRadioHandler = (e) => {
    if (e.target.checked) {
      setPaymentMethod(e.target.value);
    }
  };

  return (
    <div className={style.payment}>
      <h2>Payment</h2>
      <h3>Select Payment Method</h3>
      <div className="">
        <div className={`d-flex align-items-center ${style.inputGroup}`}>
          <input
            defaultChecked={true}
            type="radio"
            id="pm1"
            value="pm1"
            name="payment-method"
            onChange={changeRadioHandler}
          />
          <label htmlFor="pm1">Credit payment</label>
        </div>
        <div className={`d-flex align-items-center ${style.inputGroup}`}>
          <input
            value="pm2"
            type="radio"
            id="pm2"
            name="payment-method"
            onChange={changeRadioHandler}
          />
          <label htmlFor="pm2">Online Payment</label>
        </div>
      </div>
      <div className={` my-2 ${style.promoCode}`}>
        <h4 className={`w-100 d-flex  align-items-center `} onClick={toggleBox}>
          Do you have a promo code?
          <ChevronDownIcon className={style.dropIcon} />
        </h4>
        <div
          className={`d-flex w-100 ${style.promoInput} ${
            showBox && style.showBox
          }`}
        >
          <input type="text" placeholder="Type code" />
          <button className="d-flex justify-content-center align-items-center">
            +
          </button>
        </div>
      </div>
      {/* show conditionaly payment method content */}
      {/* online payment method */}
      <div className={` my-3 ${style.paymentMethodContent}`}>
        {paymentMethod === "pm1" && (
          <div
            className={`my-3 d-flex justify-content-sm-end  ${style.payButton}`}
          >
            <button>Go to pay online</button>
          </div>
        )}
        {/* credit Payment method */}
        {paymentMethod === "pm2" && <PaymentForm />}
      </div>
    </div>
  );
};

export default Payment;
