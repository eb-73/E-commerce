import { useEffect, useState } from "react";
import style from "./Side.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import CSSTransition from "react-transition-group/CSSTransition";
const Side = (props) => {
  const router = useRouter();
  const [showBox, setShowBox] = useState(false);
  const initialValue = props.items.map((item) => ({
    name: item,
    value: false,
  }));
  const [check, setCheck] = useState(initialValue);
  //set checkbox with query data
  useEffect(() => {
    if (router.query[props.name] || Array.isArray(router.query[props.name])) {
      const query = router.query[props.name];
      setCheck((prevState) =>
        prevState.map((item) => {
          if (Array.isArray(query) && query.includes(item.name)) {
            return { name: item.name, value: true };
          } else if (!Array.isArray(query) && query === item.name) {
            return { name: item.name, value: true };
          } else {
            return { name: item.name, value: false };
          }
        })
      );
    }
  }, [router.query[props.name]]);
  // update query string with checkbox form
  const filterHandler = (e) => {
    console.log("change");
    let queryString = check
      .filter((item) => item.value === true)
      .map((item) => item.name);
    const value = e.target.value;
    if (e.target.checked) {
      setCheck((prevState) => {
        return prevState.map((item) => {
          if (item.name === value) {
            return { name: item.name, value: true };
          } else {
            return { name: item.name, value: item.value };
          }
        });
      });
      queryString.push(value);
    } else {
      setCheck((prevState) => {
        return prevState.map((item) => {
          if (item.name === value) {
            return { name: item.name, value: false };
          } else {
            return { name: item.name, value: item.value };
          }
        });
      });
      for (let i = 0; i < queryString.length; i++) {
        if (queryString[i] === value) {
          queryString.splice(i, 1);
        }
      }
    }
    console.log(router.pathname);
    router.push(
      {
        pathname: "/search",
        query:
          router.pathname === "/"
            ? { [props.name]: queryString }
            : { ...router.query, [props.name]: queryString },
      },
      undefined,
      { shallow: true }
    );
  };
  const showBoxHandler = () => {
    setShowBox((prevState) => !prevState);
  };

  return (
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

      <CSSTransition
        in={showBox}
        timeout={{
          enter: 400,
          exit: 500,
        }}
        unmountOnExit
        mountOnEnter
        classNames={{
          enter: style.enter,
          enterActive: style.enterActive,
          exit: style.exit,
          exitActive: style.exitActive,
        }}
      >
        <ul className={` ${style.list} ${showBox && style.showList}`}>
          {check.map((item, index) => (
            <li key={index} className=" my-2 form-check ">
              <label className="px-2 form-check-label">
                <input
                  onChange={filterHandler}
                  className=" form-check-input"
                  value={item.name}
                  checked={item.value}
                  type="checkbox"
                ></input>
                {item.name}
              </label>
              {props.name === "color" && (
                <div
                  style={{
                    backgroundColor: item.name,
                  }}
                  className={style.colorShowBox}
                ></div>
              )}
            </li>
          ))}
        </ul>
      </CSSTransition>
    </div>
  );
};

export default Side;
