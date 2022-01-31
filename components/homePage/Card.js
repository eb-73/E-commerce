import style from "./Card.module.css";
import Image from "next/image";
import Context from "../../context/ctxStore";
import { useContext } from "react";
import { useRouter } from "next/router";
const Card = (props) => {
  const ctx = useContext(Context);
  const router = useRouter();
  const clickHandler = () => {
    router.replace(`/${props.id}`);
  };
  return (
    <div
      className={` m-1 ${style.card} ${
        ctx.smallView ? style.smallView : style.largeView
      }`}
      onClick={clickHandler}
    >
      <div className={style.pic}>
        {/* <img src={props.url.src} alt="product picture" /> */}

        <Image
          src={props.url[0]}
          alt="product picture"
          width={1728}
          height={2160}
          layout="responsive"
        />
      </div>

      <h3 className={style.title}>{props.title}</h3>
      <h1 className={style.price}>${props.price}</h1>
    </div>
  );
};

export default Card;
