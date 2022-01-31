import style from "./Layout.module.css";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
const Layout = (props) => {
  return (
    <div className={`${style.layout}`}>
      <Navigation />
      <main className={style.main}>{props.children}</main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Layout;
