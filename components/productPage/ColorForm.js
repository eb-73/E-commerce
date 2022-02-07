import style from "./ColorForm.module.css";
const ColorForm = (props) => {
  const selectColorHandler = (e) => {
    const color = e.target.value;
    props.setColor(color);
  };
  return (
    <div className={`w-100 mt-2 ${style.colorSelect}`}>
      <div
        className={`w-100 d-flex justify-content-start align-items-center flex-wrap ${style.radioGroup}`}
      >
        {props.colors.map((item, index) => (
          <div key={index}>
            <input
              type="radio"
              id={item}
              name="colorSelector"
              value={item}
              onChange={selectColorHandler}
            />
            <label htmlFor={item} style={{ backgroundColor: item }}></label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorForm;
