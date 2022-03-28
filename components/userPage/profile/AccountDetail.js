import style from "./AccountDetail.module.css";
import useForm from "../../../hooks/useForm";
import DeleteModal from "./DeleteModal";
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckIcon, XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { signIn } from "next-auth/react";
const AccountDetail = (props) => {
  const [showModal, setShowModal] = useState(false);
  const userEmail = useSelector((state) => state.Auth.authenticatedEmail);
  const userId = useSelector((state) => state.Auth.userId);
  const {
    inputValue: textValue,
    validateInput: validateText,
    inputIsNotValid: textNotValid,
    change: textChange,
    blur: textBlur,
    clear: clearText,
  } = useForm("text", "");
  const {
    inputValue: emailValue,
    validateInput: validateEmail,
    inputIsNotValid: emailNotValid,
    change: emailChange,
    blur: emailBlur,
    clear: clearEmail,
  } = useForm("email", userEmail);
  const {
    inputValue: postalValue,
    validateInput: validatePostal,
    inputIsNotValid: postalNotValid,
    change: postalChange,
    blur: postalBlur,
    clear: clearPostal,
  } = useForm("postal", "");
  const {
    inputValue: dateValue,
    validateInput: validateDate,
    change: dateChange,
    clear: clearDate,
  } = useForm("date", "");
  const {
    inputValue: selectValue,
    validateInput: validateSelect,
    change: selectChange,
    clear: clearSelect,
  } = useForm("select", "Fars");
  const formValidate =
    validateText && validateEmail && validatePostal && dateValue && selectValue;
  // save change user information
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formValidate) {
      return;
    }
    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify({
        currentUserEmail: userEmail,
        newEmail: emailValue,
        newDateOfBrith: dateValue,
        newLocation: {
          province: selectValue,
          city: textValue,
          postalCode: postalValue,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (userEmail !== emailValue) {
      try {
        const result = await signIn("credentials", {
          redirect: false,
          oldEmail: userEmail,
          newEmail: emailValue,
        });
        if (result.ok && !result.error) {
          toast.success("changes-successfully-added");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  //show delete account modal
  const showModalHandler = () => {
    setShowModal(true);
  };
  //hide delete account modal
  const hideModalHandler = () => {
    setShowModal(false);
  };
  return (
    <div
      className={`d-sm-block ${style.accountDetail} ${
        props.contentName === "profile" ? "d-block" : "d-none"
      } `}
    >
      <Link href="/account/profile">
        <button
          className={`d-block d-sm-none  ${style.backButton}`}
          onClick={props.showHandler}
        >
          <ArrowLeftIcon className={`${style.backIcon}`} />
        </button>
      </Link>
      <h2>Account Details</h2>
      <form className={` ${style.accountForm}`} onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <div className={`d-flex ${style.inputGroup}`}>
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
        <label htmlFor="date">Date of Brith</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="date"
            id="date"
            placeholder="Select date"
            max="2009-04-01"
            onChange={dateChange}
            value={dateValue}
          />
        </div>
        <label>Province</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <select value={selectValue} onChange={selectChange}>
            <option value="Fars">Fars</option>
            <option value="Tehran">Tehran</option>
            <option value="Kerman">Kerman</option>
            <option value="Esfahan">Esfahan</option>
          </select>
        </div>
        <label htmlFor="city">City</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="text"
            id="city"
            placeholder="Enter your city"
            onChange={textChange}
            value={textValue}
            onBlur={textBlur}
          />
          {textNotValid && <XIcon className={style.unCheckIcon} />}
          {validateText && <CheckIcon className={style.checkIcon} />}
        </div>
        <label htmlFor="postal">postal Code</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="text"
            name="postalCode"
            id="postal"
            placeholder="Enter your postal code"
            maxLength="10"
            onChange={postalChange}
            value={postalValue}
            onBlur={postalBlur}
          />
          {postalNotValid && <XIcon className={style.unCheckIcon} />}
          {validatePostal && <CheckIcon className={style.checkIcon} />}
        </div>
        <div className={`d-flex justify-content-end ${style.saveButton} `}>
          <button type="submit" disabled={!formValidate}>
            Save
          </button>
        </div>
      </form>
      <div
        className={`py-3 my-4 d-flex justify-content-between align-items-center ${style.deleteAccount}`}
      >
        Delete Account <button onClick={showModalHandler}>Delete</button>
      </div>
      {showModal && <DeleteModal userId={userId} hide={hideModalHandler} />}
    </div>
  );
};

export default AccountDetail;
