import style from "./LoadingButton.module.css";
const LoaadingButton = (props) => {
  return (
    <div
      className={`my-4 d-flex justify-content-center align-items-center ${style.loadingButton}`}
    >
      <button
        className="btn btn-outline-secondary btn-sm "
        onClick={props.setSizeHandler}
        disabled={props.loadMore}
      >
        {props.loadMore ? (
          <>
            <span
              className="spinner-border spinner-border-sm mx-1"
              role="status"
              aria-hidden="true"
            ></span>
            Loading ...
          </>
        ) : (
          "Show more"
        )}
      </button>
    </div>
  );
};

export default LoaadingButton;
