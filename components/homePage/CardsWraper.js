import style from "./CardsWraper.module.css";
import Card from "./Card";
import LoadingDots from "../ui/LoadingDots";

const CardsWraper = (props) => {
  return (
    <div
      className={`d-flex flex-wrap flex-sm-row align-items-sm-start  justify-content-center justify-content-sm-start ${style.cardsWraper}`}
    >
      {props.products.length > 0
        ? props.products.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              title={item.product_title}
              sub_title={item.product_sub_title}
              price={item.product_price}
              url={item.pic_url}
            />
          ))
        : // <LoadingDots />
          "ffd"}
    </div>
  );
};

export default CardsWraper;
