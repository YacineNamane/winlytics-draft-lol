import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roles: {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null,
  },
  winrates: [],
  averageWinrate: null,
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
    setWinrates: (state, action) => {
      state.winrates = action.payload;
    },
    calculateAverageWinrate: (state) => {
      const selectedChampions = Object.values(state.roles).filter(Boolean);
      if (selectedChampions.length === 0) return;

      const totalWinrate = selectedChampions.reduce((total, champion) => {
        const winrateEntry = state.winrates.find(
          (entry) => entry.champion === champion.name
        );
        return winrateEntry ? total + winrateEntry.winrate : total;
      }, 0);

      state.averageWinrate = (totalWinrate / selectedChampions.length).toFixed(
        2
      );
    },
  },
});

export const { selectChampion, setWinrates, calculateAverageWinrate } =
  draftSlice.actions;
export default draftSlice.reducer;
