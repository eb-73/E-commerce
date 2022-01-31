import style from "./CardsWraper.module.css";
import Card from "./Card";

const CardsWraper = (props) => {
  return (
    <div
      className={`d-flex flex-wrap flex-sm-row align-items-sm-start  justify-content-center justify-content-sm-start ${style.cardsWraper}`}
    >
      {props.clothes.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.product_title}
          sub_title={item.product_sub_title}
          price={item.product_price}
          url={item.pic_url}
        />
      ))}
      {/* <Card title="jickets" price="22" url="/productImage/product3.png" />
      <Card title="jickets" price="22" url="/productImage/product3.png" />
      <Card title="jickets" price="22" url="/productImage/product3.png" />
      <Card title="jickets" price="22" url="/productImage/product3.png" />
      <Card title="jickets" price="22" url="/productImage/product3.png" /> */}
    </div>
  );
};

export default CardsWraper;
