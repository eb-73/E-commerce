import { useState } from "react";
import style from "./Side.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
const Side = (props) => {
  const [showBox, setShowBox] = useState(false);
  const showBoxHandler = () => {
    setShowBox((prevState) => !prevState);
  };
  return (
    <aside className={`${style.side}`}>
      <div
        className={`d-flex mb-2 flex-column flex-justify-content ${style.boxWraper}`}
      >
        <h4
          className="d-flex justify-content-between align-items-center"
          onClick={showBoxHandler}
        >
          {props.name}
          <ChevronDownIcon className={style.dropIcon} />
        </h4>

        <ul className={` ${style.list} ${showBox && style.showList}`}>
          {props.items.map((item, index) => (
            <li key={index} className=" my-2 form-check">
              <label className="px-2 form-check-label">
                <input className=" form-check-input" type="checkbox"></input>
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Side;
