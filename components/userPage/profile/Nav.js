import style from "./Nav.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Nav = () => {
  const [active, setActive] = useState({ profile: false, orders: false });
  const router = useRouter();
  const { user = [] } = router.query;

  useEffect(() => {
    if (user[0] === "profile") {
      setActive({ profile: true, orders: false });
    } else if (user[0] === "orders") {
      setActive({ profile: false, orders: true });
    }
  }, [user]);
  return (
    <ul
      className={`nav justify-content-center align-items-center ${style.list}`}
    >
      <li className={`nav-item mx-4 ${active.profile && style.active}`}>
        <Link href="/account/profile">Profile</Link>
      </li>
      <li className={`nav-item mx-4 ${active.orders && style.active}`}>
        <Link href="/account/orders">Orders</Link>
      </li>
    </ul>
  );
};

export default Nav;
