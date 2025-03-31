import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null,
  },
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    selectChampion: (state, action) => {
      const { role, champion } = action.payload;

      if (!state.roles) {
        state.roles = { ...initialState.roles };
      }

      state.roles[role] = champion;
    },
  },
});

export const { selectChampion } = draftSlice.actions;
export default draftSlice.reducer;
