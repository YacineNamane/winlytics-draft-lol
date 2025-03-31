import { configureStore } from "@reduxjs/toolkit";
import championsReducer from "../features/champions/championsSlice";
import draftReducer from "../features/draft/draftSlice";

export const store = configureStore({
  reducer: {
    champions: championsReducer,
    draft: draftReducer,
  },
});

export default store;
