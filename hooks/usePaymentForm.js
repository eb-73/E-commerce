import { useState } from "react";
const creditCardNumber = (value) => {
  const number = value
    .replace(/\s?/g, "")
    .replace(/[^0-9,.]+/g, "")
    .replace(/(\d{4})/g, "$1 ")
    .trim();
  return number;
};
const creditCardExpiry = (value, stateValue) => {
  if (value.indexOf(".") >= 0 || value.length > 5) {
    return;
  }

  if (value.length === 2 && stateValue.length === 1) {
    value += "/";
  }
  return value;
};
function usePaymentForm(mode, defaultValue) {
  const [input, setInput] = useState(defaultValue);
  const [touched, setTouched] = useState(false);
  let validateInput;
  if (mode === "creditCardNumber") {
    validateInput = input.trim().length === 19;
  } else if (mode === "creditCardExpiry") {
    validateInput = input.trim().length === 2;
  } else if (mode === "creditCardCvv") {
    validateInput = input.trim().length === 3;
  } else if (mode === "creditCardPass") {
    validateInput = input.trim().length === 6;
  } else {
    validateInput = false;
  }
  let inputIsNotValid = !validateInput && touched;

  const inputChangeHandler = (e) => {
    // const value = e.target.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
    const value = e.target.value;
    if (mode === "creditCardNumber") {
      const number = creditCardNumber(value);
      setInput(number);
    } else if (mode === "creditCardExpiry") {
      //   const number = creditCardExpiry(value.replace(/[^0-9,/]+/g, ""), input);
      const number = value.replace(/[^0-9,/]+/g, "");
      setInput(number);
    } else if (mode === "creditCardPass") {
      const number = value.replace(/[^0-9,.]+/g, "");
      setInput(number);
    } else {
      setInput(value);
    }
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

export default usePaymentForm;
