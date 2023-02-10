import React from "react";
import "./nextButton.scss";
import { useDispatch } from "react-redux";
import { nextQuestion } from "../../redux/slices/countries.slice";

const NextButton = () => {
  const dispatch = useDispatch();
  return (
    <button
      className="NextButton"
      type="button"
      onClick={() => dispatch(nextQuestion())}
    >
      Next
    </button>
  );
};

export default NextButton;
