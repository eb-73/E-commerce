import style from "./CardsWraper.module.css";
import Card from "./Card";
import LoadingDots from "../ui/LoadingDots";
import { useSelector } from "react-redux";
import { EmojiSadIcon } from "@heroicons/react/solid";
const CardsWraper = (props) => {
  const { products, query } = props;
  const loading = useSelector((state) => state.SearchProducts.loading);

  if (loading) {
    return <LoadingDots />;
  }
  return (
    <div
      className={`d-flex flex-wrap flex-sm-row align-items-sm-start  justify-content-center justify-content-sm-start ${style.cardsWraper}`}
    >
      {products.length > 0 ? (
        props.products.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.product_title}
            sub_title={item.product_sub_title}
            price={item.product_price}
            url={item.pic_url}
          />
        ))
      ) : (
        <h1
          className={`mx-auto mt-5 d-flex flex-column align-items-center ${style.noItem}`}
        >
          {query && <EmojiSadIcon className={style.noItemIcon} />}
          {query && `We could not find anything for "${query}".`}
          {!query && `Search somethings.`}
        </h1>
      )}
    </div>
  );
};

export default CardsWraper;
