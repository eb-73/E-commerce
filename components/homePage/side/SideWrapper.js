import style from "./SideWrapper.module.css";
const sideWrapper = (props) => {
  return (
    <div
      className={`mt-3 d-none d-sm-block d-flex flex-column ${style.sideWrapper}`}
    >
      {props.children}
    </div>
  );
};

export default sideWrapper;
