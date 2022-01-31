import { Toaster } from "react-hot-toast";
import style from "./LayoutLogin.module.css";
function LayoutLogin(props) {
  return (
    <main
      className={`d-flex justify-content-center align-items-center ${style.main}`}
    >
      {props.children}
      <Toaster />
    </main>
  );
}

export default LayoutLogin;
