import { configureStore } from "@reduxjs/toolkit";
import championsReducer from "../features/champions/championsSlice";

export const store = configureStore({
  reducer: {
    champions: championsReducer,
  },
});

export default store;
