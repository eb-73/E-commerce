import { useState } from "react/cjs/react.development";
import style from "./Side.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
const Side = () => {
  const [showBox, setShowBox] = useState({
    box1: false,
    box2: false,
  });
  const showBoxHandler = (id) => {
    setShowBox((prevState) => {
      return { ...prevState, [id]: !prevState[id] };
    });
  };
  return (
    <aside className={`mt-1 d-none d-sm-block  ${style.side}`}>
      <div
        className={`d-flex mb-2 flex-column flex-justify-content ${style.boxWraper}`}
      >
        <h4
          className="d-flex justify-content-between align-items-center"
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
      <div
        className={`d-flex my-2 flex-column flex-justify-content ${style.boxWraper}`}
      >
        <h4
          className="d-flex justify-content-between align-items-center"
          onClick={() => {
            showBoxHandler("box2");
          }}
        >
          Size
          <ChevronDownIcon className={style.dropIcon} />
        </h4>
        <ul className={`${style.list} ${showBox.box2 && style.showList}`}>
          <li className=" my-2  form-check">
            <label className="px-2 form-check-label">
              <input className=" form-check-input" type="checkbox"></input>
              XL
            </label>
          </li>
          <li className=" my-2  form-check">
            <label className="px-2 form-check-label">
              <input className=" form-check-input" type="checkbox"></input>
              2XL
            </label>
          </li>
          <li className=" my-2  form-check">
            <label className="px-2 form-check-label">
              <input className=" form-check-input" type="checkbox"></input>
              Md
            </label>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Side;
