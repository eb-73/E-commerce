import style from "./PaymentForm.module.css";
import usePaymentForm from "../../hooks/usePaymentForm";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { sendOrderPaymentToDatabase } from "../../redux/actions";
import { orderAction } from "../../redux/orderSlice";
const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth);
  const {
    inputValue: yearExpiryValue,
    validateInput: validateYearExpiry,
    inputIsNotValid: yearExpiryNotValid,
    change: yearExpiryChange,
    blur: yearExpiryBlur,
    clear: clearYearExpiry,
  } = usePaymentForm("creditCardExpiry", "");
  const {
    inputValue: monthExpiryValue,
    validateInput: validateMonthExpiry,
    inputIsNotValid: monthExpiryNotValid,
    change: monthExpiryChange,
    blur: monthExpiryBlur,
    clear: clearMonthExpiry,
  } = usePaymentForm("creditCardExpiry", "");
  const {
    inputValue: cvvValue,
    validateInput: validateCvv,
    inputIsNotValid: cvvNotValid,
    change: cvvChange,
    blur: cvvBlur,
    clear: clearCvv,
  } = usePaymentForm("creditCardCvv", "");
  const {
    inputValue: creditValue,
    validateInput: validateCredit,
    inputIsNotValid: creditNotValid,
    change: creditChange,
    blur: creditBlur,
    clear: clearCredit,
  } = usePaymentForm("creditCardNumber", "");
  const {
    inputValue: passwordValue,
    validateInput: validatePassword,
    inputIsNotValid: passwordNotValid,
    change: passwordChange,
    blur: passwordBlur,
    clear: clearPassword,
  } = usePaymentForm("creditCardPass", "");
  const formValidate =
    validatePassword &&
    validateCredit &&
    validateCvv &&
    validateMonthExpiry &&
    validateYearExpiry;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formValidate) {
      return;
    }
    setLoading(true);
    try {
      const result = await sendOrderPaymentToDatabase({
        id: user.userId,
        method: "credit payment",
        email: user.authenticatedEmail,
      });
      setLoading(false);
      dispatch(orderAction.clearOrder());
      toast.success(result.message);
      router.push(`/checkout/order-complete/${result.id}`);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <form onSubmit={onSubmitHandler} className={style.paymentForm}>
      <div className="w-100 my-3">
        <label htmlFor="ccn">
          <h4>Card Number</h4>
          <h6>Enter the 16-digit card number on the card</h6>
        </label>
        <div
          className={` d-flex justify-content-between ${style.inputGroup} ${
            creditNotValid && style.notValid
          }`}
        >
          <input
            id="ccn"
            type="tel"
            maxLength="19"
            autoCapitalize="cc-number"
            tabIndex="0"
            placeholder="XXXX - XXXX - XXXX - XXXX"
            value={creditValue}
            onChange={creditChange}
            onBlur={creditBlur}
          />
        </div>
      </div>
      <div className="w-100 my-3 d-flex flex-sm-row flex-column justify-content-sm-between align-items-center ">
        <label className="w-sm-50 w-100" htmlFor="ccv">
          <h4>CVV2 Number</h4>
          <h6>Enter the 3 or 4 digit number on the card</h6>
        </label>
        <div
          className={`d-flex w-sm-50 w-100 ${style.inputGroup} ${
            cvvNotValid && style.notValid
          }`}
        >
          <input
            id="ccv"
            type="text"
            maxLength="3"
            placeholder="CCV2"
            value={cvvValue}
            onChange={cvvChange}
            onBlur={cvvBlur}
          />
        </div>
      </div>
      <div className="w-100 d-flex  flex-sm-row flex-column justify-content-sm-between align-items-center">
        <label className="w-sm-50 w-100" htmlFor="cce">
          <h4>Expiry Date </h4>
          <h6>Enter the expiration date of the card</h6>
        </label>
        <div className="w-sm-50 w-100 my-3 d-flex justify-content-between align-items-center">
          <div
            className={`d-flex  mr-2 w-50 ${style.inputGroup} ${
              style.expiryDate
            } ${monthExpiryNotValid && style.notValid}`}
          >
            <input
              id="cce"
              type="tel"
              maxLength="2"
              placeholder="MONTH"
              value={monthExpiryValue}
              onChange={monthExpiryChange}
              onBlur={monthExpiryBlur}
            />
          </div>
          <h5 className="h-100 m-0 p-0">/</h5>
          <div
            className={`d-flex w-50 ${style.inputGroup} ${style.expiryDate} ${
              yearExpiryNotValid && style.notValid
            }`}
          >
            <input
              id="cce2"
              type="tel"
              maxLength="2"
              placeholder="YEAR"
              value={yearExpiryValue}
              onChange={yearExpiryChange}
              onBlur={yearExpiryBlur}
            />
          </div>
        </div>
      </div>
      <div className="w-100 d-flex  flex-sm-row flex-column justify-content-sm-between align-items-center">
        <label className="w-sm-50 w-100" htmlFor="password">
          <h4>Password </h4>
          <h6>Enter your dynamic password</h6>
        </label>
        <div
          className={`d-flex w-sm-50 w-100 my-3 ${style.inputGroup} ${
            passwordNotValid && style.notValid
          }`}
        >
          <input
            id="password"
            type="password"
            maxLength="6"
            value={passwordValue}
            onChange={passwordChange}
            onBlur={passwordBlur}
          />
        </div>
      </div>
      <div className={`m-0 d-flex justify-content-sm-end  ${style.formButton}`}>
        <button type="submit" disabled={!formValidate}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm mx-1"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          Pay & Continue
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
