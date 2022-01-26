import style from "./SortNav.module.css";
import Dropdown from "./Dropdown";
import Filter from "./Filter";
import { FilterIcon } from "@heroicons/react/solid";

import { CSSTransition } from "react-transition-group";
import { useState } from "react";
const SortNav = () => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div
      className={`mt-5 text-gray d-flex justify-content-between ${style.sort}`}
    >
      <h6 className={` ${style.itemNumber}`}>3 Items Found</h6>
      <div className="d-flex justify-content-between align-items-center">
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
        <Filter closeFilter={closeModal} />
      </CSSTransition>
    </div>
  );
};

export default SortNav;
