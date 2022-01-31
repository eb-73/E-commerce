import FilterClothing from "./FilterClothing";
import FilterHome from "./FilterHome";
import FilterShoes from "./FilterShoes";
const Filter = (props) => {
  switch (props.page) {
    case "clothing":
      return <FilterClothing closeFilter={props.closeFilter} />;
    case "shoes":
      return <FilterShoes closeFilter={props.closeFilter} />;
    case "home":
      return <FilterHome closeFilter={props.closeFilter} />;
    default:
      return <SideHome closeFilter={props.closeFilter} />;
  }
};

export default Filter;
