import style from "./ProfileButton.module.css";
import { UserIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { orderAction } from "../../../redux/orderSlice";
import { signOut } from "next-auth/react";
const ProfileButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    e.stopPropagation();
    router.push("/account/profile");
  };
  const profileClickHandler = (e) => {
    e.stopPropagation();
    router.push("/account/profile");
  };
  const ordersClickHandler = (e) => {
    e.stopPropagation();
    router.push("/account/orders");
  };
  const logoutHandler = () => {
    signOut({ redirect: false });
    localStorage.removeItem("cart");
    dispatch(orderAction.clearOrder());
  };
  return (
    <button className={style.profileButton} onClick={clickHandler}>
      <UserIcon className={style.navIcon} />
      <ul className={style.profileButtonList}>
        <h5>Account</h5>
        <li onClick={profileClickHandler}>Profile</li>
        <li onClick={ordersClickHandler}>Orders</li>
        <li onClick={logoutHandler}>Logout</li>
      </ul>
    </button>
  );
};

export default ProfileButton;
