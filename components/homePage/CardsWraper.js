import style from "./CardsWraper.module.css";
import Card from "./Card";
import pic from "../../assets/product3.png";
const CardsWraper = () => {
  return (
    <div
      className={`d-flex flex-wrap flex-sm-row align-items-sm-start flex-column align-items-center ${style.cardsWraper}`}
    >
      <Card title="jickets" price="22" url={pic} />
      <Card title="jickets" price="22" url={pic} />
      <Card title="jickets" price="22" url={pic} />
      <Card title="jickets" price="22" url={pic} />
      <Card title="jickets" price="22" url={pic} />
    </div>
  );
};

export default CardsWraper;
