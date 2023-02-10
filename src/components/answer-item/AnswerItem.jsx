import React from "react";
import "./answerItem.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  correctAnswer,
  selectIsCorrect,
  selectHasPlayed,
  selectSelectedCountryId,
  selectQuestionCountriesAndAnswer,
} from "../../redux/slices/countries.slice";

const AnswerItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const isCorrect = useSelector(selectIsCorrect);
  const hasPlayed = useSelector(selectHasPlayed);
  const selectedCountryId = useSelector(selectSelectedCountryId);
  const { answerCountry } = useSelector(selectQuestionCountriesAndAnswer);
  const { id, name } = item;
  return (
    <div
      className={`AnswerItem ${
        (isCorrect && selectedCountryId === id) ||
        (hasPlayed && answerCountry.id === id)
          ? "correct"
          : ""
      } ${isCorrect === false && selectedCountryId === id ? "wrong" : ""}`}
      onClick={
        !hasPlayed ? () => dispatch(correctAnswer({ answerCountry, id })) : null
      }
    >
      <p className="answer-char">{"ABCD"[index]}</p>

      <p className="answer-content">{name}</p>
    </div>
  );
};

export default AnswerItem;
