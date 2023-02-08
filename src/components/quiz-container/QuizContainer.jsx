import React, { useEffect } from "react";
import "./QuizContainer.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  selectError,
  selectStatus,
  selectHasPlayed,
  selectQuestionCountriesAndAnswer,
  correctAnswer,
  selectIsCorrect,
  selectSelectedCountryId,
  nextQuestion,
  selectIsGameOver,
  selectPoints,
  restartGame,
  selectQuestionNumber,
} from "../../redux/slices/countries.slice";

const QuizContainer = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const hasPlayed = useSelector(selectHasPlayed);
  const isCorrect = useSelector(selectIsCorrect);
  const isGameOver = useSelector(selectIsGameOver);
  const points = useSelector(selectPoints);
  const selectedCountryId = useSelector(selectSelectedCountryId);
  const questionNumber = useSelector(selectQuestionNumber);

  const { questionCountries, answerCountry } = useSelector(
    selectQuestionCountriesAndAnswer
  );

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
            {questionNumber % 2 === 0 ? (
              <p className="question">
                {answerCountry?.capital} is the capital of
              </p>
            ) : (
              <div className="question">
                <img
                  className="flag"
                  src={answerCountry?.flag}
                  alt={answerCountry?.name}
                />
                <p>Which country does this flag belong to ?</p>
              </div>
            )}

            <div className="answers-container">
              {questionCountries.map(({ id, name, capital, flag }, index) => (
                <div
                  className={`answer-item ${
                    (isCorrect && selectedCountryId === id) ||
                    (hasPlayed && answerCountry.id === id)
                      ? "correct"
                      : ""
                  } ${
                    isCorrect === false && selectedCountryId === id
                      ? "wrong"
                      : ""
                  }`}
                  key={id}
                  onClick={
                    !hasPlayed
                      ? () => dispatch(correctAnswer({ answerCountry, id }))
                      : null
                  }
                >
                  <p className="answer-char">{"ABCD"[index]}</p>

                  <p className="answer-content">{name}</p>
                </div>
              ))}
            </div>
            {hasPlayed && (
              <button
                className="next-btn"
                type="button"
                onClick={() => dispatch(nextQuestion())}
              >
                Next
              </button>
            )}
          </>
        )}
        {isGameOver && (
          <div className="gameover">
            <img
              className="results-image"
              src="../../../undraw_winners_ao2o 2.svg"
            />
            <div className="body-results">
              <h2>Results</h2>
              <p>
                You got <span className="points">{points}</span>
                {points > 1 ? " corrects answers" : " correct answer"}
              </p>
            </div>

            <button
              className="try-again-btn"
              type="button"
              onClick={() => dispatch(restartGame())}
            >
              Try again
            </button>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default QuizContainer;
