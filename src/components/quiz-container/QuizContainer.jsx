import "./QuizContainer.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  selectError,
  selectStatus,
  selectHasPlayed,
  selectIsGameOver,
} from "../../redux/slices/countries.slice";
import GameOver from "../game-over/GameOver";
import NextButton from "../next-btn/NextButton";
import AnswersContainer from "../answers-container/AnswersContainer";
import Question from "../question/Question";

const QuizContainer = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const hasPlayed = useSelector(selectHasPlayed);
  const isGameOver = useSelector(selectIsGameOver);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCountries());
    }
  }, [status, dispatch]);

  return (
    <div className="QuizContainer">
      <h1>Country Quiz</h1>
      <img
        className="logo"
        src="../../../undraw_adventure_4hum 1.svg"
        alt="Logo"
      />
      <div className="main-container">
        {status === "loading" && <p>"Chargement..."</p>}
        {status === "succeeded" && !isGameOver && (
          <>
            <Question />
            <AnswersContainer />
            {hasPlayed && <NextButton />}
          </>
        )}
        {isGameOver && <GameOver />}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default QuizContainer;
