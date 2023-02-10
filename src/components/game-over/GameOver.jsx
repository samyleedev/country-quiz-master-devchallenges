import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPoints, restartGame } from "../../redux/slices/countries.slice";
import "./gameOver.scss";

const GameOver = () => {
  const dispatch = useDispatch();
  const points = useSelector(selectPoints);
  return (
    <div className="GameOver">
      <img
        className="results-image"
        src="../../../undraw_winners_ao2o 2.svg"
        alt="logo results"
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
  );
};

export default GameOver;
