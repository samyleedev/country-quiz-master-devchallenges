import React from "react";
import { useSelector } from "react-redux";
import { selectQuestionCountriesAndAnswer } from "../../redux/slices/countries.slice";
import AnswerItem from "../answer-item/AnswerItem";

const AnswersContainer = () => {
  const { questionCountries } = useSelector(selectQuestionCountriesAndAnswer);

  return (
    <div className="AnswersContainer">
      {questionCountries.map((item, index) => (
        <AnswerItem key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default AnswersContainer;
