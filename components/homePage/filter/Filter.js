import style from "./Filter.module.css";
import { XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { createPortal } from "react-dom";
const Filter = (props) => {
  const overlayCloseFilterHandler = (e) => {
    if (e.target.id === "overlayFilter") {
      props.closeFilter();
    }
  };
  const closeFilterHandler = (e) => {
    e.preventDefault();
    props.closeFilter();
  };
  return createPortal(
    <div
      className={`d-block d-sm-none ${style.overlayFilter}`}
      id="overlayFilter"
      onClick={overlayCloseFilterHandler}
    >
      <form className={` ${style.filter} `} onSubmit={closeFilterHandler}>
        <div
          className={`py-2 px-3 mb-2 d-flex justify-content-between ${style.title}`}
        >
          <h2>Filters</h2>
          <XIcon className={style.closeIcon} onClick={props.closeFilter} />
        </div>
        <div className={`px-3 ${style.content}`}>{props.children}</div>

        <button className={`fixed  ${style.searchFilterButton}`} type="submit">
          Done
        </button>
      </form>
    </div>,
    document.getElementById("myportal")
  );
};

export default Filter;
