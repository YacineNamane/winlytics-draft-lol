import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ally: {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null,
  },
  enemy: {
    top: null,
    jungle: null,
    mid: null,
    adc: null,
    support: null,
  },
  activeSide: "ally",
  winrates: [],
  averageWinrate: {
    ally: null,
    enemy: null,
  },
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    selectChampion: (state, action) => {
      const { role, champion } = action.payload;
      state[state.activeSide][role] = champion;
    },
    switchActiveSide: (state) => {
      state.activeSide = state.activeSide === "ally" ? "enemy" : "ally";
    },
    setWinrates: (state, action) => {
      state.winrates = action.payload;
    },
    calculateAverageWinrate: (state) => {
      ["ally", "enemy"].forEach((side) => {
        const champions = Object.values(state[side]).filter(Boolean);
        if (champions.length === 0) {
          state.averageWinrate[side] = null;
          return;
        }

        const totalWinrate = champions.reduce((total, champion) => {
          const found = state.winrates.find(
            (c) => c.champion === champion.name
          );
          return found ? total + found.winrate : total;
        }, 0);

        state.averageWinrate[side] = (totalWinrate / champions.length).toFixed(
          2
        );
      });
    },
    resetSideDraft: (state, action) => {
      const side = action.payload;
      if (side === "ally" || side === "enemy") {
        state[side] = {
          top: null,
          jungle: null,
          mid: null,
          adc: null,
          support: null,
        };
        state.averageWinrate[side] = null;
      }
    },
  },
});

export const {
  selectChampion,
  switchActiveSide,
  setWinrates,
  calculateAverageWinrate,
  resetSideDraft,
} = draftSlice.actions;

export default draftSlice.reducer;
