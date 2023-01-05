import React, { useEffect, useState } from "react";
import axios from "axios";
import "./QuizContainer.scss";

const randomCountryIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const QuizContainer = () => {
  const [countriesArray, setCountriesArray] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [points, setPoints] = useState(0);
  const [gameMode, setGameMode] = useState("findCapital");
  const [hasPlayed, setHasPlayed] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  const [countryChosenInTheArray, setCountryChosenInTheArray] = useState(null);

  const getNewCountriesArray = async () => {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    const countries = [];

    for (let i = 0; countries.length < 4; i++) {
      const indexCountry = randomCountryIndex(0, 250);
      // const indexCountry = randomCountryIndex(0, 5);
      // const isAlreadyInTheArray =
      //   indexCountry === countries.find((country) => country.id);

      // while (isAlreadyInTheArray) {
      //   indexCountry = randomCountryIndex(0, 5);
      // }

      countries.push({
        id: indexCountry,
        name: data[indexCountry].name.common,
        capital: data[indexCountry].capital[0],
        flag: data[indexCountry].flags.png,
      });
    }

    setCountriesArray(countries);
    setCountryChosenInTheArray(randomCountryIndex(0, countries.length - 1));
  };

  const correctAnswers = (index) => {
    setHasPlayed(true);

    const { name, capital, flag } = countriesArray[index];

    if (name === countriesArray[countryChosenInTheArray].name) {
      setCorrectAnswer(index);
      setPoints(points + 1);
    } else {
      setWrongAnswer(index);
      setCorrectAnswer(
        countriesArray.findIndex(
          (country) => country.id === countriesArray[countryChosenInTheArray].id
        )
      );
    }
  };

  const goToNextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
  };

  // Start of the game
  useEffect(() => {
    getNewCountriesArray();
  }, []);

  // useEffect(() => {
  //   if (countriesArray) {
  //     const chosenCountry =
  //       countriesArray[randomCountryIndex(0, countriesArray.length)];

  //     setCountryChosenInTheArray(chosenCountry);
  //   }
  // }, [countriesArray]);

  // New question
  useEffect(() => {
    setHasPlayed(false);
    setCorrectAnswer(null);
    setWrongAnswer(null);
    setCountriesArray(null);
    getNewCountriesArray();
  }, [questionNumber]);
  console.log({ countriesArray });
  console.log({ countryChosenInTheArray });

  return (
    <div className="QuizContainer">
      <h1>Country Quiz</h1>
      <img src="../../../undraw_adventure_4hum 1.svg" alt="Logo" />
      <div className="main-container">
        {countriesArray && countryChosenInTheArray ? (
          <>
            {questionNumber % 2 === 0 ? (
              <p className="question">
                Which is the flag of{" "}
                {countriesArray[countryChosenInTheArray].name}
              </p>
            ) : (
              <p className="question">
                {countriesArray[countryChosenInTheArray].capital} is the capital
                of
              </p>
            )}

            <div className="answers-container">
              {countriesArray.map(({ name, capital, flag }, index) => (
                <div
                  className={`answer-item ${
                    correctAnswer === index ? "correct" : ""
                  } ${wrongAnswer === index ? "wrong" : ""}`}
                  key={index}
                  onClick={!hasPlayed ? () => correctAnswers(index) : null}
                >
                  <p className="answer-char">{"ABCD"[index]}</p>
                  {questionNumber % 2 === 0 ? (
                    <img className="answer-content" src={flag} />
                  ) : (
                    <p className="answer-content">{name}</p>
                  )}
                </div>
              ))}
            </div>
            {hasPlayed && (
              <button
                className="next-btn"
                type="button"
                onClick={() => goToNextQuestion()}
              >
                Next
              </button>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
