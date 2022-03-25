import style from "./Card.module.css";
import Image from "next/image";
import { ViewContext } from "../../context/ctxStore";
import { useContext } from "react";
import { useRouter } from "next/router";
const Card = (props) => {
  const ctx = useContext(ViewContext);
  const router = useRouter();
  const clickHandler = () => {
    router.replace(`/product/${props.id}`);
  };
  return (
    <div
      className={` mx-2 my-3 ${style.card} ${
        ctx.smallView ? style.smallView : style.largeView
      }`}
      onClick={clickHandler}
    >
      <div className={style.pic}>
        {/* <img src={props.url[0]} alt="product picture" /> */}

        <Image
          src={props.url[0]}
          alt="product picture"
          width={1728}
          height={2160}
          layout="responsive"
          priority={false}
          loading="eager"
        />
      </div>

      <h3 className={`my-2 ${style.title}`}>{props.title}</h3>
      <h1 className={`my-2 ${style.price}`}>${props.price}</h1>
    </div>
  );
};

export default Card;
