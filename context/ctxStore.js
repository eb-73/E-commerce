import { createContext, useState } from "react";
const Context = createContext({
  smallView: true,
  setView(type) {},
});

export const ContextProvider = (props) => {
  const [view, setView] = useState(true);
  const changeView = (type) => {
    if (type === "small") {
      setView(true);
    } else if (type === "large") {
      setView(false);
    }
  };

  return (
    <Context.Provider
      value={{
        smallView: view,
        setView: changeView,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default Context;
