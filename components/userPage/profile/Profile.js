import style from "./Profile.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { orderAction } from "../../../redux/orderSlice";
import { useDispatch } from "react-redux";
import {
  UserIcon,
  LogoutIcon,
  KeyIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
const Profile = (props) => {
  const dispatch = useDispatch();

  //logout user
  const logoutHandler = () => {
    signOut({ redirect: false });
    localStorage.removeItem("cart");
    dispatch(orderAction.clearOrder());
  };
  return (
    <main className={`mt-5 d-flex flex-sm-row flex-column  ${style.profile}`}>
      <aside
        className={`d-sm-block ${style.profileNav} ${
          props.hideSide && "d-none"
        }`}
      >
        <ul className={`nav flex-column align-items-start ${style.list}`}>
          <Link href="/account/profile">
            <li
              className={`nav-item my-2 d-flex align-content-center`}
              onClick={() => {
                props.hideHandler("profile");
              }}
            >
              <UserIcon className={style.profileIcons} />
              <a>Account Detail</a>
              <ChevronRightIcon
                className={`d-block d-sm-none " ${style.arrowIcons}`}
              />
            </li>
          </Link>
          <Link href="/account/profile/change-password">
            <li
              className={`nav-item my-2 d-flex align-content-center `}
              onClick={() => {
                props.hideHandler("change-password");
              }}
            >
              <KeyIcon className={style.profileIcons} />
              <a>Change Password</a>
              <ChevronRightIcon
                className={`d-block d-sm-none " ${style.arrowIcons}`}
              />
            </li>
          </Link>
          <li
            onClick={logoutHandler}
            className={`nav-item my-2 d-flex align-content-center`}
          >
            <LogoutIcon className={style.profileIcons} />
            <a>Logout</a>
          </li>
        </ul>
      </aside>
      <section
        className={` d-sm-block ${style.profileContent} ${
          !props.contentName && "d-none"
        }`}
      >
        {props.children}
      </section>
    </main>
  );
};

export default Profile;
