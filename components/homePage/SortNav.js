import style from "./SortNav.module.css";
import Dropdown from "./Dropdown";
import Filter from "./filter/Filter";
import { FilterIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faThLarge } from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import { useState, useContext } from "react";
import Context from "../../context/ctxStore";
const SortNav = (props) => {
  const [showModal, setShowModal] = useState(false);
  const ctx = useContext(Context);
  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const changeViewHandler = (type) => {
    ctx.setView(type);
  };
  return (
    <div
      className={`mt-5 text-gray d-flex justify-content-between ${style.sort}`}
    >
      <h6 className={` ${style.itemNumber}`}>{props.quantity} Items Found</h6>
      <div className="d-flex justify-content-between align-items-center">
        <div
          className={`p-2 mx-2 d-flex justify-content-around align-items-center  ${style.viewIcons}`}
        >
          <FontAwesomeIcon
            icon={faTh}
            className={style.viewIcon}
            onClick={changeViewHandler.bind(null, "small")}
          />
          <FontAwesomeIcon
            icon={faThLarge}
            className={style.viewIcon}
            onClick={changeViewHandler.bind(null, "large")}
          />
        </div>

        <Dropdown />
        <FilterIcon
          onClick={showModalHandler}
          className={`d-block d-sm-none  ${style.filterIcon}`}
        />
      </div>
      <CSSTransition
        in={showModal}
        timeout={500}
        unmountOnExit
        mountOnEnter
        classNames={{
          enter: style.showModal,
          enterActive: style.showModalActive,
          exit: style.hideModal,
          exitActive: style.hideModalActive,
        }}
      >
        <Filter closeFilter={closeModal}>{props.children}</Filter>
      </CSSTransition>
    </div>
  );
};

export default SortNav;
