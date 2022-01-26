import style from "./Card.module.css";
const Card = (props) => {
  return (
    <div className={` m-1 ${style.card}`}>
      <div className={style.pic}>
        <img src={props.url.src} alt="product picture" />
      </div>

      <h3 className={style.title}>{props.title}</h3>
      <h1 className={style.price}>${props.price}</h1>
    </div>
  );
};

export default Card;
