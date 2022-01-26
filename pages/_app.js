import "../styles/globals.css";
import Layout from "../components/layout/Layout";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
