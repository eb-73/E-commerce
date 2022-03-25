import style from "./Dropdown.module.css";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Dropdown = () => {
  const [showDrop, setShowDrop] = useState(false);
  const router = useRouter();
  const pathName = router.pathname;
  const element = useRef();
  const closeDropdownHandler = (e) => {
    e.stopPropagation();
    if (e.target === element.current) {
      return;
    } else {
      setShowDrop(false);
    }
  };
  const clickHandler = () => {
    setShowDrop((prevState) => !prevState);
  };
  useEffect(() => {
    document.addEventListener("click", closeDropdownHandler);
    return () => {
      document.removeEventListener("click", closeDropdownHandler);
    };
  }, []);
  return (
    <div className={style.dropdown}>
      <div
        className={`d-flex justify-content-around align-items-center ${style.dropButton}`}
        onClick={clickHandler}
      >
        <h6 ref={element}>Sort</h6>
        {!showDrop && <ChevronDownIcon className={style.dropIcon} />}
        {showDrop && <ChevronUpIcon className={style.dropIcon} />}
      </div>

      <ul
        className={`d-flex flex-column align-items-center ${style.dropBox} ${
          showDrop && style.showDropdown
        }`}
      >
        <Link
          href={{
            pathname: pathName,
            query: { ...router.query, sort: "newest" },
          }}
          shallow={true}
        >
          <li>Newest</li>
        </Link>
        <Link
          href={{
            pathname: pathName,
            query: { ...router.query, sort: "priceDesc" },
          }}
          shallow={true}
        >
          <li>Price: High-Low</li>
        </Link>
        <Link
          href={{
            pathname: pathName,
            query: { ...router.query, sort: "priceAsc" },
          }}
          shallow={true}
        >
          <li>Price: Low-High</li>
        </Link>
      </ul>
    </div>
  );
};

export default Dropdown;
