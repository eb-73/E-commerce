import Link from "next/link";
import Loading from "../ui/Loading";
import style from "./Login.module.css";
import useForm from "../../hooks/useForm";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import useLogin from "../../hooks/useLogin";
const Login = () => {
  const { login: loginCredentials } = useLogin();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { from } = router.query;
  const {
    inputValue: emailInput,
    validateInput: emailValidate,
    inputIsNotValid: emailIsNotValid,
    change: changeEmail,
    blur: blurEmail,
    clear: clearEmail,
  } = useForm("email", "");
  const {
    inputValue: passInput,
    validateInput: passValidate,
    inputIsNotValid: passIsNotValid,
    change: changePass,
    blur: blurPass,
    clear: clearPass,
  } = useForm("pass", "");
  const validateForm = emailValidate && passValidate;
  //submit form
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm) {
      return;
    }
    try {
      setLoading(true);
      const result = await loginCredentials(emailInput, passInput);
      toast.success("Welcome to your account");
      setLoading(false);
      if (from === "/cart") router.replace("/checkout/delivery");
      else router.replace("/");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };
  //signin with google
  const googleSigninHandler = async () => {
    try {
      const result = await signIn("google");
    } catch (err) {
      toast.error(err.message);
    }
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
