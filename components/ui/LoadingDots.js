import style from "./LoadingDots.module.css";
const LoadingDots = () => {
  return (
    <div className={style.snippet}>
      <div className={style.stage}>
        <div className={style.pulse}></div>
      </div>
    </div>
  );
};

export default LoadingDots;
