import style from "./Filter.module.css";
import { XIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { createPortal } from "react-dom";
const Filter = (props) => {
  const closeFilterHandler = (e) => {
    if (e.target.id === "overlayFilter") {
      props.closeFilter();
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
          className={`py-2 px-3 mb-2 d-flex justify-content-between ${style.title}`}
        >
          <h2>Filters</h2>
          <XIcon className={style.closeIcon} onClick={props.closeFilter} />
        </div>
        <div className={style.content}>{props.children}</div>

        <button
          className={`fixed  ${style.searchFilterButton}`}
          type="button"
          onclick={props.closeFilter}
        >
          Done
        </button>
      </form>
    </div>,
    document.getElementById("myportal")
  );
};

export default Filter;
