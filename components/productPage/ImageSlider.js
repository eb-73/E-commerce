import style from "./ImageSlider.module.css";
import ProductImg from "./ProductImg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
const ImageSlider = (props) => {
  const firstPic = props.imagesUrl[0];
  const { imagesUrl } = props;
  return (
    <div
      id="carouselExampleInterval"
      className={`carousel slide ${style.imageSlider}`}
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className={`carousel-inner ${style.imageWraper}`}>
        {imagesUrl.map((item, index) => (
          <ProductImg
            key={index}
            url={item}
            active={item === firstPic && true}
          />
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span className="" aria-hidden="true">
          <ChevronLeftIcon className="w-50" />
        </span>
      </button>
      <button
        className="carousel-control-next "
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span className=" " aria-hidden="true">
          <ChevronRightIcon className="w-50" />
        </span>
      </button>
    </div>
  );
};

export default ImageSlider;
