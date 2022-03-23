import style from "./Error404.module.css";
import Link from "next/link";
const Error404 = () => {
  return (
    <div
      className={`d-flex flex-column justify-content-center align-items-center ${style.error}`}
    >
      <h1>Oops!</h1>
      <h4 className="mt-2 mb-5">
        We couldn't seem to find the page you are loking for.
      </h4>
      <Link href="/">
        <button className="mt-3">RTURN TO MAIN PAGE</button>
      </Link>
    </div>
  );
};

export default Error404;
