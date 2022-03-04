import { useState } from "react";
function useForm(mode, defaultValue) {
  const [input, setInput] = useState(defaultValue);
  const [touched, setTouched] = useState(false);

  let validateInput;
  if (mode === "text") {
    validateInput = input.trim().length > 2;
  } else if (mode === "email") {
    validateInput = input.includes("@") && input.includes(".com");
  } else if (mode === "pass") {
    validateInput = input.length >= 8;
  } else if (mode === "postal") {
    validateInput = input.trim().length === 10;
  } else if (mode === "select") {
    validateInput = input.trim().length !== 0;
  } else if (mode === "phone") {
    validateInput = input.trim().length === 10;
  } else {
    validateInput = false;
  }
  let inputIsNotValid = !validateInput && touched;

  const inputChangeHandler = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  const inputBlurHandler = () => {
    setTouched(true);
  };
  const clearInput = () => {
    setInput("");
    setTouched(false);
  };

  return {
    inputValue: input,
    validateInput,
    inputIsNotValid,
    change: inputChangeHandler,
    blur: inputBlurHandler,
    clear: clearInput,
  };
}

export default useForm;
