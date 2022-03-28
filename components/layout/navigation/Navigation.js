import style from "./Navigation.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { authAction } from "../../../redux/authSlice";
import {
  getFavoriteFromDatabase,
  getOrderListFromDatabase,
  getOrderListFromLocal,
  sendFavoriteToDatabase,
  sendOrderListToDatabase,
  sendOrderListToLocal,
} from "../../../actions/actions";
import { useEffect, useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIcon2 } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileButton from "./ProfileButton";
import toast from "react-hot-toast";
const Navigation = () => {
  const [showDrop, setShowDrop] = useState(false);
  const auth = useSelector((state) => state.Auth);
  const cart = useSelector((state) => state.Order);
  const fav = useSelector((state) => state.Favorite);
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  const userEmail = session?.user.email;
  const userId = session?.user.userId;
  let allQuantity;
  allQuantity = cart.orderProducts.reduce((previousValue, currentValue) => {
    return previousValue + currentValue.quantity;
  }, 0);

  useEffect(() => {
    //listen to change authState
    if (isUser) {
      dispatch(authAction.login({ userEmail, id: userId }));
    } else if (!isUser) {
      dispatch(authAction.logout());
    }
  }, [isUser, userEmail]);

  useEffect(() => {
    // get order list of user
    if (auth.isAuth) {
      dispatch(getOrderListFromDatabase(auth.userId, "pending"));
      dispatch(getFavoriteFromDatabase(auth.userId));
    } else if (!auth.isAuth) {
      dispatch(getOrderListFromLocal());
    }
  }, [auth.isAuth]);

  // send updated cart to database
  useEffect(() => {
    if (cart.orderId && isUser) {
      sendOrderListToDatabase(cart)
        .then()
        .catch((err) => toast.error(err.message));
    } else if (!cart.orderId && !isUser) {
      sendOrderListToLocal(cart);
    }
  }, [cart, isUser]);
  //send favorite to database
  useEffect(() => {
    if (fav.userId && isUser) {
      sendFavoriteToDatabase(fav)
        .then()
        .catch((err) => toast.error(err.message));
    }
  }, [fav, isUser]);
  //login user
  const loginHandler = () => {
    router.replace("/signup");
  };
  //show Dropdown
  const showDropdown = () => {
    setShowDrop((prevState) => !prevState);
  };
  const clickFavHandler = async () => {
    if (status === "authenticated" && isUser) {
      router.push("/favorites");
    } else if (status === "unauthenticated" && !isUser) {
      router.push(`/login?from=/favorites`);
    }
  };
  return (
    <nav className="navbar fixed-top navbar-expand-sm  navbar-light px-sm-4 ">
      <div className="container-fluid d-flex flex-row-reverse justify-content-between">
        <div
          className={`d-flex justify-content-between align-items-center ${style.shop}`}
        >
          <div className={style.favIcon} onClick={clickFavHandler}>
            {fav.favProducts.length === 0 ? (
              <HeartIcon className={style.navIcon} />
            ) : (
              <HeartIcon2 className={`${style.navIcon} ${style.appear}`} />
            )}
          </div>

          <Link href="/cart">
            <div className={style.cartIcon}>
              <ShoppingCartIcon className={style.navIcon} />
              <div
                className={` ${allQuantity ? style.badge : style.hideBadge}`}
              >
                {allQuantity > 9 ? "9+" : allQuantity}
              </div>
            </div>
          </Link>
          <div className={style.profile}>
            {auth.isAuth ? (
              <ProfileButton />
            ) : (
              <button className={style.loginButton} onClick={loginHandler}>
                Login
              </button>
            )}
          </div>
        </div>
        <div className={`navbar-brand d-sm-none m-0 d-block  ${style.logo}`}>
          <Link href="/">
            <a>
              <h4>shop</h4>
              <h5>E.B</h5>
            </a>
          </Link>
        </div>
        <button
          className={`navbar-toggler border-0 `}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span>
            <MenuAlt2Icon className={style.toggleIcon} />
          </span>
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
                    className={` d-flex px-2 justify-content-start align-items-center`}
                  >
                    Shoes
                  </li>
                </Link>
                <Link href="/products/clothing">
                  <li
                    className={` d-flex px-2 justify-content-start align-items-center`}
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
                <Link href="/products/shoes">
                  <li
                    className={` d-flex  justify-content-start align-items-center`}
                  >
                    Shoes
                  </li>
                </Link>
                <Link href="/products/clothing">
                  <li
                    className={` d-flex  justify-content-start align-items-center`}
                  >
                    Clothing
                  </li>
                </Link>
              </ul>
            </li>
            <li className={style.navItem}>
              <a className="nav-link" href="#">
                Contacts Us
              </a>
            </li>
            <li className={style.navItem}>
              <a className="nav-link" href="#">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div className={`navbar-brand d-sm-block m-0 d-none  ${style.logo}`}>
          <Link href="/">
            <a>
              <h4>shop</h4>
              <h5>E.B</h5>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
