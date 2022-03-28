import style from "./SideWrapper.module.css";
const sideWrapper = (props) => {
  return (
    <aside
      className={`mt-3 d-none d-sm-block d-flex flex-column ${style.sideWrapper}`}
    >
      {props.children}
    </aside>
  );
};

export default sideWrapper;
