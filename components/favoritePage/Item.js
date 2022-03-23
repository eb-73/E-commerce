import style from "./Item.module.css";
import { HeartIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { favoriteAction } from "../../redux/favoriteSlice";
const Item = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    e.stopPropagation();
    router.replace(`/product/${props.id}`);
  };
  const removeHandler = (e) => {
    e.stopPropagation();
    dispatch(favoriteAction.remove(props.id));
  };
  return (
    <div className={` mx-2 my-3 ${style.card}`} onClick={clickHandler}>
      <button onClick={removeHandler}>
        <HeartIcon className={style.heartIcon} />
      </button>
      <div className={style.pic}>
        {/* <img src={props.url[0]} alt="product picture" /> */}

        <Image
          src={props.url}
          alt="product picture"
          width={1728}
          height={2160}
          layout="responsive"
          priority={false}
          loading="eager"
        />
      </div>

      <h3 className={style.title}>{props.title}</h3>
      <h4 className={style.subTitle}>{props.subTitle}</h4>
    </div>
  );
};

export default Item;
