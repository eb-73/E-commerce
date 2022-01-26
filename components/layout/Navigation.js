import style from "./Navigation.module.css";
import prof from "../../assets/default.jpg";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../../redux/authSlice";
import { useEffect, useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
const Navigation = () => {
  const [showDrop, setShowDrop] = useState(false);
  const isLogin = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    //listen to change authState

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authAction.login());
        console.log(user.uid);
      } else {
        dispatch(authAction.logout());
      }
    });
  }, []);
  //logout user
  const logoutHandler = () => {
    signOut(auth).then(() => {
      router.replace("/login");
    });
  };
  //login user
  const loginHandler = () => {
    router.replace("/signup");
  };
  //show Dropdown
  const showDropdown = () => {
    setShowDrop((prevState) => !prevState);
  };
  return (
    <nav className="navbar fixed-top navbar-expand-sm bg-light navbar-light px-sm-4 ">
      <div className="container-fluid d-flex flex-row-reverse justify-content-between">
        <div className={style.shop}>
          <HeartIcon className={style.navIcon} />
          <ShoppingCartIcon className={style.navIcon} />
          <div className={style.profile}>
            {isLogin ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <button onClick={loginHandler}>Login</button>
            )}
          </div>
        </div>
        <a className="navbar-brand d-sm-none d-block">Ebrahim</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className={style.navItem} onClick={showDropdown}>
              <a className="nav-link d-flex justify-content-between" href="#">
                Category
                <ChevronDownIcon className={style.dropIcon} />
              </a>
              <ul
                className={`d-none d-sm-flex flex-sm-column align-items-center py-2 ${style.navDropDown}`}
              >
                <li
                  className={` d-flex  justify-content-center align-items-center`}
                >
                  Shoes
                </li>
                <li
                  className={` d-flex  justify-content-center align-items-center`}
                >
                  Clothing
                </li>
              </ul>
              <ul
                className={`d-sm-none d-flex flex-column justify-content-between px-2 ${
                  style.navDropDown2
                } ${showDrop && style.showNavDropDown2}`}
              >
                <li
                  className={` d-flex  justify-content-start align-items-center`}
                >
                  Shoes
                </li>
                <li
                  className={` d-flex  justify-content-start align-items-center`}
                >
                  Clothing
                </li>
              </ul>
            </li>
            <li className={style.navItem}>
              <a className="nav-link" href="#">
                Contacts
              </a>
            </li>
            <li className={style.navItem}>
              <a className="nav-link" href="#">
                About
              </a>
            </li>
          </ul>
        </div>
        <a className="navbar-brand d-none d-sm-block" href="#">
          Ebrahim
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
