import style from "./Filter.module.css";
import { XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { createPortal } from "react-dom";
import { useState } from "react";
const FilterHome = (props) => {
  const [showBox, setShowBox] = useState({
    box1: false,
  });
  const showBoxHandler = (id) => {
    setShowBox((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };
  const closeFilterHandler = (e) => {
    if (e.target.id === "overlayFilter") {
      props.closeFilter();
    } else {
      return;
    }
  };

  return createPortal(
    <div
      className={`d-block d-sm-none ${style.overlayFilter}`}
      id="overlayFilter"
      onClick={closeFilterHandler}
    >
      <form className={` ${style.filter} `}>
        <div
          className={`py-2 px-3 d-flex justify-content-between ${style.title}`}
        >
          <h2>Filters</h2>
          <XIcon className={style.closeIcon} onClick={props.closeFilter} />
        </div>
        <div
          className={`d-flex my-2 flex-column flex-justify-content ${style.boxWraper}`}
        >
          <h4
            className="d-flex py-3 px-3 justify-content-between align-items-center"
            onClick={() => {
              showBoxHandler("box1");
            }}
          >
            Category
            <ChevronDownIcon className={style.dropIcon} />
          </h4>
          <ul className={`${style.list} ${showBox.box1 && style.showList}`}>
            <li className=" my-2 form-check">
              <label className="px-2 form-check-label">
                <input className=" form-check-input" type="checkbox"></input>
                T-Shirts
              </label>
            </li>
            <li className=" my-2  form-check">
              <label className="px-2 form-check-label">
                <input className=" form-check-input" type="checkbox"></input>
                Suits
              </label>
            </li>
            <li className=" my-2  form-check">
              <label className="px-2 form-check-label">
                <input className=" form-check-input" type="checkbox"></input>
                Coats
              </label>
            </li>
          </ul>
        </div>

        <button className={`fixed  ${style.searchFilterButton}`} type="submit">
          Done
        </button>
      </form>
    </div>,
    document.getElementById("myportal")
  );
};

export default FilterHome;
