import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./slices/countries.slice";

const store = configureStore({
  reducer: {
    countries: countriesReducer,
  },
});

export default store;
