import React from "react";
import "./QuizContainer.scss";

const QuizContainer = () => {
  return (
    <div className="QuizContainer">
      <h1>Country Quiz</h1>
      <img src="../../../undraw_adventure_4hum 1.svg" alt="Logo" />
      <div className="main-container">
        <p className="question">Kuala Lumpur is the capital of</p>
        <div className="answers-container">
          <div className="answer-item">
            <p className="answer-char">A</p>
            <p className="answer-content">Vietnam</p>
          </div>
          <div className="answer-item">
            <p className="answer-char">B</p>
            <p className="answer-content">Malaysia</p>
          </div>
          <div className="answer-item">
            <p className="answer-char">C</p>
            <p className="answer-content">Sweden</p>
          </div>
          <div className="answer-item">
            <p className="answer-char">D</p>
            <p className="answer-content">Austria</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
