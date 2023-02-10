import "./question.scss";
import React from "react";
import { useSelector } from "react-redux";
import {
  selectQuestionNumber,
  selectQuestionCountriesAndAnswer,
} from "../../redux/slices/countries.slice";

const Question = () => {
  const questionNumber = useSelector(selectQuestionNumber);
  const { answerCountry } = useSelector(selectQuestionCountriesAndAnswer);

  return (
    <div className="Question">
      {questionNumber % 2 === 0 ? (
        <p>{answerCountry?.capital} is the capital of</p>
      ) : (
        <>
          <img
            className="flag"
            src={answerCountry?.flag}
            alt={answerCountry?.name}
          />
          <p>Which country does this flag belong to ?</p>
        </>
      )}
    </div>
  );
};

export default Question;
