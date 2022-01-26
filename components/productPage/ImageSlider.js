import style from "./ImageSlider.module.css";
import ProductImg from "./ProductImg";
import img from "../../assets/product1.png";
import img2 from "../../assets/product2.png";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
const ImageSlider = () => {
  return (
    <div
      id="carouselExampleInterval"
      className={`carousel slide ${style.imageSlider}`}
      data-bs-touch="false"
      data-bs-interval="false"
    >
      <div className={`carousel-inner ${style.imageWraper}`}>
        <ProductImg url={img.src} className="active" />
        <ProductImg url={img2.src} />
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
