import style from "./Delivery.module.css";
import useForm from "../../hooks/useForm";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { sendOrderDeliveryToDatabase } from "../../actions/actions";
import toast from "react-hot-toast";
import { useState } from "react";
const Delivery = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.Auth.userId);
  const {
    inputValue: nameValue,
    validateInput: validateName,
    inputIsNotValid: nameNotValid,
    change: nameChange,
    blur: nameBlur,
    clear: clearName,
  } = useForm("text", "");
  const {
    inputValue: lastNameValue,
    validateInput: validateLastName,
    inputIsNotValid: lastNameNotValid,
    change: lastNameChange,
    blur: lastNameBlur,
    clear: clearLastName,
  } = useForm("text", "");
  const {
    inputValue: addressValue,
    validateInput: validateAddress,
    inputIsNotValid: addressNotValid,
    change: addressChange,
    blur: addressBlur,
    clear: clearAddress,
  } = useForm("text", "");
  const {
    inputValue: cityValue,
    validateInput: validateCity,
    inputIsNotValid: cityNotValid,
    change: cityChange,
    blur: cityBlur,
    clear: clearCity,
  } = useForm("text", "");
  const {
    inputValue: emailValue,
    validateInput: validateEmail,
    inputIsNotValid: emailNotValid,
    change: emailChange,
    blur: emailBlur,
    clear: clearEmail,
  } = useForm("email", "");
  const {
    inputValue: postalValue,
    validateInput: validatePostal,
    inputIsNotValid: postalNotValid,
    change: postalChange,
    blur: postalBlur,
    clear: clearPostal,
  } = useForm("postal", "");

  const {
    inputValue: provinceValue,
    validateInput: validateProvince,
    inputIsNotValid: provinceNotValid,
    change: provinceChange,
    blur: provinceBlur,
    clear: clearProvince,
  } = useForm("text", "");
  const {
    inputValue: phoneValue,
    validateInput: validatePhone,
    inputIsNotValid: phoneNotValid,
    change: phoneChange,
    blur: phoneBlur,
    clear: clearPhone,
  } = useForm("phone", "");
  const formValidate =
    validateName &&
    validateLastName &&
    validateAddress &&
    validateCity &&
    validateProvince &&
    validatePostal &&
    validateEmail &&
    validatePhone;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formValidate) {
      return;
    }
    setLoading(true);
    try {
      const result = await sendOrderDeliveryToDatabase({
        id: userId,
        name: nameValue,
        lastName: lastNameValue,
        city: cityValue,
        address: addressValue,
        province: provinceValue,
        email: emailValue,
        phone: phoneValue,
        postalCode: postalValue,
      });
      setLoading(false);
      router.push("/checkout/payment");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <div className={`mt-2 ${style.delivery}`}>
      <h2>Delivery Options</h2>
      <form
        className={` my-3 ${style.deliveryForm}`}
        onSubmit={onSubmitHandler}
      >
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="name">First Name*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={nameChange}
                value={nameValue}
                onBlur={nameBlur}
              />
              {nameNotValid && <XIcon className={style.unCheckIcon} />}
              {validateName && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="family">Last Name*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="text"
                id="family"
                placeholder="Enter your last name"
                onChange={lastNameChange}
                value={lastNameValue}
                onBlur={lastNameBlur}
              />
              {lastNameNotValid && <XIcon className={style.unCheckIcon} />}
              {validateLastName && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
        </div>
        <label htmlFor="address">Address*</label>
        <div className={`d-flex justify-content-between ${style.inputGroup}`}>
          <input
            type="text"
            id="address"
            placeholder="Enter your address"
            onChange={addressChange}
            value={addressValue}
            onBlur={addressBlur}
          />
          {addressNotValid && <XIcon className={style.unCheckIcon} />}
          {validateAddress && <CheckIcon className={style.checkIcon} />}
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label htmlFor="Province">Province*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="text"
                id="Province"
                placeholder="Enter your Province"
                onChange={provinceChange}
                value={provinceValue}
                onBlur={provinceBlur}
              />
              {provinceNotValid && <XIcon className={style.unCheckIcon} />}
              {validateProvince && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
          <div className="col-sm-4">
            <label htmlFor="city">City*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                onChange={cityChange}
                value={cityValue}
                onBlur={cityBlur}
              />
              {cityNotValid && <XIcon className={style.unCheckIcon} />}
              {validateCity && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
          <div className="col-sm-4">
            <label htmlFor="postal">postal Code*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="text"
                name="postalCode"
                id="potal"
                placeholder="Enter your postal code"
                maxLength="10"
                onChange={postalChange}
                value={postalValue}
                onBlur={postalBlur}
              />
              {postalNotValid && <XIcon className={style.unCheckIcon} />}
              {validatePostal && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <label htmlFor="email">Email*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={emailChange}
                value={emailValue}
                onBlur={emailBlur}
              />
              {emailNotValid && <XIcon className={style.unCheckIcon} />}
              {validateEmail && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="Phone">Phone Number*</label>
            <div
              className={`d-flex justify-content-between ${style.inputGroup}`}
            >
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone number"
                onChange={phoneChange}
                value={phoneValue}
                onBlur={phoneBlur}
              />
              {phoneNotValid && <XIcon className={style.unCheckIcon} />}
              {validatePhone && <CheckIcon className={style.checkIcon} />}
            </div>
          </div>
        </div>
        <div
          className={`m-0 d-flex justify-content-sm-end  ${style.formButton}`}
        >
          <button type="submit" disabled={!formValidate}>
            {loading && (
              <span
                className="spinner-border spinner-border-sm mx-1"
                role="status"
                aria-hidden="true"
              ></span>
            )}
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Delivery;
