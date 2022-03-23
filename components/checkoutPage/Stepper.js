import style from "./Stepper.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Stepper = () => {
  const [active, setActive] = useState({
    delivery: false,
    payment: false,
    "order-complete": false,
  });
  const router = useRouter();
  const { step } = router.query;

  useEffect(() => {
    if (step[0] === "delivery") {
      setActive({ delivery: true, payment: false, "order-complete": false });
    } else if (step[0] === "payment") {
      setActive({ delivery: true, payment: true, "order-complete": false });
    } else if (step[0] === "order-complete") {
      setActive({ delivery: true, payment: true, "order-complete": true });
    }
  }, [step]);
  return (
    <ul className={`my-4 ${style.stepper}`}>
      <li
        className={`${style.stepperItem} ${active.delivery && style.active} `}
      >
        <Link href="/checkout/delivery">
          <button
            className={`${style.stepperTitle}`}
            disabled={!active.delivery}
          >
            1
          </button>
        </Link>
        <p className={`${style.stepperDesc}`}>Delivery</p>
      </li>
      <li className={`${style.stepperItem} ${active.payment && style.active} `}>
        <Link href="/checkout/payment">
          <button
            className={`${style.stepperTitle}`}
            disabled={!active.payment}
          >
            2
          </button>
        </Link>
        <p className={`${style.stepperDesc}`}>Payment</p>
      </li>
      <li
        className={`${style.stepperItem} ${
          active["order-complete"] && style.active
        }`}
      >
        <Link href="/checkout/order-complete">
          <button
            className={`${style.stepperTitle}`}
            disabled={!active["order-complete"]}
          >
            3
          </button>
        </Link>
        <p className={`${style.stepperDesc}`}>Order Complete</p>
      </li>
    </ul>
  );
};

export default Stepper;
