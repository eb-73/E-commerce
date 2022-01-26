import style from "./Dropdown.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
const Dropdown = () => {
  const [showDrop, setShowDrop] = useState(false);
  const element = useRef();
  const closeDropdownHandler = (e) => {
    e.stopPropagation();
    if (e.target === element.current) {
      return;
    } else {
      setShowDrop(false);
    }
  };
  const showDropdownHandler = () => {
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
        onClick={showDropdownHandler}
      >
        <h6 ref={element}>Sort</h6>
        <ChevronDownIcon className={style.dropIcon} />
      </div>

      <ul
        className={`d-flex flex-column align-items-center ${style.dropBox} ${
          showDrop && style.showDropdown
        }`}
      >
        <li>desc</li>
        <li>asc</li>
      </ul>
    </div>
  );
};

export default Dropdown;
