import style from "./SizeForm.module.css";
const SizeForm = (props) => {
  const selectSizeHandler = (e) => {
    const size = e.target.value;
    props.setSize(size);
  };
  return (
    <div className={`w-100 mt-2 ${style.sizeSelect} `}>
      <div
        className={`w-100  d-flex justify-content-start align-items-center  flex-wrap ${style.radioGroup}`}
      >
        {props.sizes.map((item, index) => (
          <div key={index}>
            <input
              type="radio"
              id={item.name}
              name="sizeSelector"
              value={item.name}
              onChange={selectSizeHandler}
              disabled={item.quantity === "0" && true}
            />
            <label
              htmlFor={item.name}
            >{`${item.name} (${item.quantity})`}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeForm;
