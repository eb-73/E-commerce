import SideClothing from "./SideClothing";
import SideShoes from "./SideShoes";
import SideHome from "./SideHome";
const Side = (props) => {
  switch (props.page) {
    case "clothing":
      return <SideClothing />;
    case "shoes":
      return <SideShoes />;
    case "home":
      return <SideHome />;
    default:
      return <SideHome />;
  }
};

export default Side;
