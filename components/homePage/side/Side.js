import { useEffect, useState } from "react";
import style from "./Side.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
const Side = (props) => {
  const router = useRouter();
  const [showBox, setShowBox] = useState(false);
  const initialValue = props.items.map((item) => ({
    name: item,
    value: false,
  }));
  const [check, setCheck] = useState(initialValue);

  useEffect(() => {
    if (
      router.query[props.name] &&
      Object.keys(router.query[props.name]).length > 0
    ) {
      const query = router.query[props.name];
      setCheck((prevState) =>
        prevState.map((item) => {
          if (query.includes(item.name)) {
            return { name: item.name, value: true };
          } else {
            return { name: item.name, value: false };
          }
        })
      );
    }
  }, [router.query[props.name]]);

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
            return item;
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
            return item;
          }
        });
      });
      for (let i = 0; i < queryString.length; i++) {
        if (queryString[i] === value) {
          queryString.splice(i, 1);
        }
      }
    }

    router.push(
      {
        pathname: "/search",
        query: { ...router.query, [props.name]: queryString },
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

      <ul className={` ${style.list} ${showBox && style.showList}`}>
        {props.items.map((item, index) => (
          <li key={index} className=" my-2 form-check">
            <label className="px-2 form-check-label">
              <input
                onChange={filterHandler}
                className=" form-check-input"
                value={item}
                checked={check[index].value}
                type="checkbox"
              ></input>
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Side;
