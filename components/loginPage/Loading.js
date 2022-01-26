import style from "./Loading.module.css";
const Loading = () => {
  return (
    <div
      className={`d-flex justify-content-center align-items-center ${style.loading}`}
    >
      <div className={style.shape}></div>
    </div>
  );
};

export default Loading;
