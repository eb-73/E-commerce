import style from "./Layout.module.css";
import Navigation from "./Navigation";
const Layout = (props) => {
  return (
    <div className={`${style.layout}`}>
      <Navigation />
      <main className={style.main}> {props.children}</main>
    </div>
  );
};

export default Layout;
