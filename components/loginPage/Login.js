import Link from "next/link";
import Loading from "./Loading";
import style from "./Login.module.css";
import useForm from "../../hooks/useForm";
import useFetch, { errorMessage } from "../../hooks/useFetch";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const Login = () => {
  const sendUser = useFetch("login");
  const googleSignin = useFetch("google");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  const validateForm = emailValidate && passValidate;
  //submit form
  const submitHandler = (e) => {
    e.preventDefault();
    if (!validateForm) {
      return;
    }
    setLoading(true);
    clearEmail();
    clearPass();
    sendUser("", emailInput, passInput)
      .then(() => {
        setLoading(false);
        router.replace("/");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(errorMessage(err.code));
      });
  };
  //signin with google
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
    <div className={`d-flex flex-column align-items-center ${style.login}`}>
      <h1>Welcome back</h1>
      <h3>Welcome back! Please enter your details.</h3>
      <form className={`mt-4 ${style.loginForm}`} onSubmit={submitHandler}>
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
            placeholder="Enter your password"
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
          <div className="d-flex justify-content-center align-items-center">
            <input type="checkbox" id="check" />
            <label htmlFor="check" className="mx-2">
              remember me
            </label>
          </div>

          <a href="#">Forgot password</a>
        </div>
        <button
          type="submit"
          className={`${style.submit}`}
          disabled={!validateForm}
        >
          Login
        </button>
      </form>
      <button
        type="button"
        className={`mt-2 d-flex justify-content-center align-items-center ${style.googleLogin}`}
        onClick={googleSigninHandler}
      >
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" />
        Login with google
      </button>
      <div className={`my-3 ${style.signupLink}`}>
        Don't have an account? <Link href="/signup">Sign up for free</Link>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default Login;
