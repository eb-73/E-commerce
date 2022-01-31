import style from "./Favorites.module.css";
import Card from "../homePage/Card";

const Favorites = () => {
  return (
    <div>
      <h1 className="py-3">Favorites</h1>
      <div
        className={`w-100 py-3 d-flex flex-sm-row flex-column flex-wrap justify-content-start align-items-center align-items-sm-start`}
      >
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
        <Card url="/productImage/product2.png" />
      </div>
    </div>
  );
};

export default Favorites;
