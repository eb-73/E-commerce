import style from "./ChangePass.module.css";
import useForm from "../../../hooks/useForm";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Link from "next/link";
import { CheckIcon, XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
const ChangePass = (props) => {
  const userEmail = useSelector((state) => state.Auth.authenticatedEmail);
  const {
    inputValue: oldPassValue,
    validateInput: validateOldPass,
    inputIsNotValid: oldPassNotValid,
    change: oldPassChange,
    blur: oldPassBlur,
    clear: clearOldPass,
  } = useForm("pass", "");
  const {
    inputValue: newPassValue,
    validateInput: validateNewPass,
    inputIsNotValid: newPassNotValid,
    change: newPassChange,
    blur: newPassBlur,
    clear: clearNewPass,
  } = useForm("pass", "");
  const {
    inputValue: newPass2Value,
    validateInput: validateNewPass2,
    inputIsNotValid: newPass2NotValid,
    change: newPass2Change,
    blur: newPass2Blur,
    clear: clearNewPass2,
  } = useForm("pass", "");
  const formValidate =
    validateOldPass &&
    validateNewPass &&
    validateNewPass2 &&
    newPassValue === newPass2Value;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/user/changePassword", {
      method: "PUT",
      body: JSON.stringify({
        userEmail,
        oldPass: oldPassValue,
        newPass: newPass2Value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (res.ok) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    clearOldPass();
    clearNewPass();
    clearNewPass2();
  };
  return (
    <div
      className={` d-sm-block ${style.changePass} ${
        props.contentName === "change-password" ? "d-block" : "d-none"
      }`}
    >
      <Link href="/account/profile">
        <button
          className={`d-block d-sm-none  ${style.backButton}`}
          onClick={props.showHandler}
        >
          <ArrowLeftIcon className={`${style.backIcon}`} />
        </button>
      </Link>
      <h2>Change Password</h2>
      <form className={` ${style.PassForm}`} onSubmit={onSubmitHandler}>
        <div className={`d-flex mb-4 ${style.inputGroup}`}>
          <input
            type="password"
            name="password"
            placeholder="Current Password*"
            onChange={oldPassChange}
            value={oldPassValue}
            onBlur={oldPassBlur}
          />
          {oldPassNotValid && <XIcon className={style.unCheckIcon} />}
          {validateOldPass && <CheckIcon className={style.checkIcon} />}
        </div>
        <div className={`d-flex mb-4 ${style.inputGroup}`}>
          <input
            type="password"
            name="password"
            placeholder="New Password*"
            onChange={newPassChange}
            value={newPassValue}
            onBlur={newPassBlur}
          />
          {newPassNotValid && <XIcon className={style.unCheckIcon} />}
          {validateNewPass && <CheckIcon className={style.checkIcon} />}
        </div>
        <div className={`d-flex mb-4 ${style.inputGroup}`}>
          <input
            type="password"
            name="password"
            placeholder="Confirm New Password*"
            onChange={newPass2Change}
            value={newPass2Value}
            onBlur={newPass2Blur}
          />
          {(newPass2NotValid || newPassValue !== newPass2Value) && (
            <XIcon className={style.unCheckIcon} />
          )}
          {validateNewPass2 && newPassValue === newPass2Value && (
            <CheckIcon className={style.checkIcon} />
          )}
        </div>
        <div
          className={` mt-2 mb-5 d-flex justify-content-end ${style.saveButton}`}
        >
          <button type="submit" disabled={!formValidate}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;
