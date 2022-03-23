import style from "./SkeletonLoading.module.css";
const SkeletonLoading = () => {
  return (
    <div className={style.all}>
      {/* <div className={`mb-3 ${style.skeleton} ${style.title}`}></div>
      <div className={`my-3 `}>
        <div className={`mb-4 ${style.skeleton} ${style.title}`}></div>
        <div className={`my-2 ${style.skeleton} ${style.content}`}></div>
      </div>
      <div className={`my-3 `}>
        <div className={`mb-4 ${style.skeleton} ${style.title}`}></div>
        <div className={`my-2 ${style.skeleton} ${style.content}`}></div>
      </div> */}
      <div className={`my-3 `}>
        <div className={`mb-4 mx-2 ${style.skeleton} ${style.title}`}></div>
        <div className={`my-2 mx-2 ${style.skeleton} ${style.content}`}></div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
