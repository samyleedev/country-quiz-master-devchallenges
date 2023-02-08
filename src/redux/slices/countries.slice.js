import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";
import { randomIndex } from "../../utils/Functions";

const API_URL = "https://restcountries.com/v3.1/all?fields=name,capital,flags";

const initialState = {
  allCountries: [],
  status: "idle", // "idle" || "loading" || "succeeded" || "failed",
  error: null,
  questionNumber: 1,
  hasPlayed: false,
  points: 0,
  isGameOver: false,
  selectedCountryId: null,
  isCorrect: null,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    try {
      const { data } = await axios.get(API_URL);
      return [...data];
    } catch (error) {
      return error.message;
    }
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    correctAnswer(state, action) {
      state.hasPlayed = true;
      state.selectedCountryId = action.payload.id;

      const answerCountryId = action.payload.answerCountry.id;

      if (state.selectedCountryId === answerCountryId) {
        state.isCorrect = true;
        state.points += 1;
      } else {
        state.isCorrect = false;
        state.isGameOver = true;
      }
    },
    nextQuestion(state, action) {
      if (!state.isGameOver) {
        state.questionNumber += 1;
        state.selectedCountryId = null;
        state.hasPlayed = false;
        state.isCorrect = null;
      }
    },
    restartGame: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.allCountries = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const selectStatus = (state) => state.countries.status;
export const selectError = (state) => state.countries.error;
export const selectHasPlayed = (state) => state.countries.hasPlayed;
export const selectIsCorrect = (state) => state.countries.isCorrect;
export const selectIsGameOver = (state) => state.countries.isGameOver;
export const selectPoints = (state) => state.countries.points;
export const selectQuestionNumber = (state) => state.countries.questionNumber;

export const selectSelectedCountryId = (state) =>
  state.countries.selectedCountryId;

export const selectQuestionCountriesAndAnswer = createSelector(
  (state) => state.countries.allCountries,
  (state) => state.countries.questionNumber,
  (allCountries) => {
    let questionCountries = [];
    let answerCountry = null;

    if (allCountries.length > 0) {
      for (let i = 0; questionCountries.length < 4; i++) {
        let indexCountry;
        let findValue;
        do {
          indexCountry = randomIndex(0, allCountries.length - 1);
          findValue = questionCountries.find(
            (country) => country.id === indexCountry
          );
        } while (findValue !== undefined);

        questionCountries.push({
          id: indexCountry,
          name: allCountries[indexCountry].name.common,
          capital: allCountries[indexCountry].capital[0],
          flag: allCountries[indexCountry].flags.png,
        });
      }
    }

    answerCountry =
      questionCountries[randomIndex(0, questionCountries.length - 1)];

    return { questionCountries, answerCountry };
  }
);

export const { correctAnswer, nextQuestion, restartGame } =
  countriesSlice.actions;
export default countriesSlice.reducer;
