import { createContext, useState } from "react";
//change view cards
export const ViewContext = createContext({
  smallView: true,
  setView(type) {},
});
export const ViewContextProvider = (props) => {
  const [view, setView] = useState(true);
  const changeView = (type) => {
    if (type === "small") {
      setView(true);
    } else if (type === "large") {
      setView(false);
    }
  };

  return (
    <ViewContext.Provider
      value={{
        smallView: view,
        setView: changeView,
      }}
    >
      {props.children}
    </ViewContext.Provider>
  );
};
