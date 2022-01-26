import style from "./Signup.module.css";
import Link from "next/link";
import Loading from "./Loading";
import useForm from "../../hooks/useForm";
import useFetch, { errorMessage } from "../../hooks/useFetch";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const Signup = () => {
  const sendUser = useFetch("signup");
  const googleSignin = useFetch("google");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    inputValue: nameInput,
    validateInput: nameValidate,
    inputIsNotValid: nameIsNotValid,
    change: changeName,
    blur: blurName,
    clear: clearName,
  } = useForm("text");
  const {
    inputValue: emailInput,
    validateInput: emailValidate,
    inputIsNotValid: emailIsNotValid,
    change: changeEmail,
    blur: blurEmail,
    clear: clearEmail,
  } = useForm("email");
  const {
    inputValue: passInput,
    validateInput: passValidate,
    inputIsNotValid: passIsNotValid,
    change: changePass,
    blur: blurPass,
    clear: clearPass,
  } = useForm("pass");
  const validateForm = nameValidate && emailValidate && passValidate;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm) {
      return;
    }
    setLoading(true);
    clearName();
    clearEmail();
    clearPass();
    sendUser(nameInput, emailInput, passInput)
      .then(() => {
        setLoading(false);
        router.replace("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(errorMessage(err.code));
        console.log(err.code);
      });
  };
  const googleSigninHandler = () => {
    googleSignin()
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };
  return (
    <div className={`d-flex flex-column align-items-center ${style.signup}`}>
      <h1>Sign up now</h1>
      <h3> Please enter your details.</h3>
      <form className={`mt-4 ${style.signupForm}`} onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={changeName}
            value={nameInput}
            onBlur={blurName}
          />
          {nameIsNotValid && <XIcon className={style.unCheckIcon} />}
          {nameValidate && <CheckIcon className={style.checkIcon} />}
        </div>
        <label htmlFor="email">Email</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={changeEmail}
            value={emailInput}
            onBlur={blurEmail}
          />
          {emailIsNotValid && <XIcon className={style.unCheckIcon} />}
          {emailValidate && <CheckIcon className={style.checkIcon} />}
        </div>
        <label htmlFor="pass">Password</label>
        <div className={`d-flex ${style.inputGroup}`}>
          <input
            type="password"
            placeholder="Pick a strong password"
            onChange={changePass}
            value={passInput}
            onBlur={blurPass}
          />
          {passIsNotValid && <XIcon className={style.unCheckIcon} />}
          {passValidate && <CheckIcon className={style.checkIcon} />}
        </div>
        <div
          className={`d-flex justify-content-between align-items-center ${style.formExtra}`}
        >
          <div className="d-flex justify-content-start align-items-center">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="mx-2">
              I <a href="#">agree</a> with term and <a href="#">privacy</a>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className={`${style.submit}`}
          disabled={!validateForm}
        >
          Sign up
        </button>
      </form>
      <button
        type="button"
        className={`mt-2 d-flex justify-content-center align-items-center ${style.googleSignup}`}
        onClick={googleSigninHandler}
      >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
        Sign up with google
      </button>
      <div className={`my-3 ${style.signupLink}`}>
        Already have an account? <Link href="/login">Login</Link>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Signup;
