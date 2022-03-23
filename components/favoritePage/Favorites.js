import style from "./Favorites.module.css";
import Item from "./Item";
import { useSelector } from "react-redux";
import favorite from "../../redux/favoriteSlice";
const Favorites = () => {
  const favorites = useSelector((state) => state.Favorite.favProducts);
  return (
    <div>
      <h1 className="pt-5">Favorites</h1>
      <div
        className={`w-100 py-3 d-flex flex-sm-row flex-column flex-wrap justify-content-start align-items-center align-items-sm-start`}
      >
        {favorites.length === 0 ? (
          <h5 className="my-4 w-100 d-flex justify-content-center">
            Items added to your Favorites will be saved here.
          </h5>
        ) : (
          favorites.map((item) => (
            <Item
              key={item.productId}
              id={item.productId}
              title={item.productTitle}
              subTitle={item.productSubTitle}
              url={item.imageUrl}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
