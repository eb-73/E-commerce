import style from "./Navigation.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { signOut, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();
  console.log("session", session);
  useEffect(() => {
    //listen to change authState
    if (session) {
      dispatch(authAction.login());
    } else {
      dispatch(authAction.logout());
    }
  }, [session]);
  //logout user
  const logoutHandler = () => {
    signOut({ redirect: false });
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
    <nav className="navbar fixed-top navbar-expand-sm  navbar-light px-sm-4 ">
      <div className="container-fluid d-flex flex-row-reverse justify-content-between">
        <div className={style.shop}>
          <Link href="/favorites">
            <HeartIcon className={style.navIcon} />
          </Link>
          <Link href="/cart">
            <ShoppingCartIcon className={style.navIcon} />
          </Link>
          <div className={style.profile}>
            {isLogin ? (
              <button onClick={logoutHandler}>Logout</button>
            ) : (
              <button onClick={loginHandler}>Login</button>
            )}
          </div>
        </div>
        <div className={`navbar-brand d-sm-none d-block  ${style.logo}`}>
          <Link href="/">
            <a>
              <h5>shop</h5>
              <h4>E.B</h4>
            </a>
          </Link>
        </div>
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
                <Link href="/products/shoes">
                  <li
                    className={` d-flex  justify-content-center align-items-center`}
                  >
                    Shoes
                  </li>
                </Link>
                <Link href="/products/clothing">
                  <li
                    className={` d-flex  justify-content-center align-items-center`}
                  >
                    Clothing
                  </li>
                </Link>
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

        <div className={`navbar-brand d-sm-block d-none  ${style.logo}`}>
          <Link href="/">
            <a>
              <h5>shop</h5>
              <h4>E.B</h4>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
