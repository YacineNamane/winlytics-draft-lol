import { createSelector } from "@reduxjs/toolkit";

export const selectDraftState = (state) => state.draft;

export const selectRolesBySide = (side) =>
  createSelector([selectDraftState], (draft) => draft[side]);

export const selectActiveSide = createSelector(
  [selectDraftState],
  (draft) => draft.activeSide
);

export const selectAverageWinrate = createSelector(
  [selectDraftState],
  (draft) => draft.averageWinrate
);

export const selectWinrates = createSelector(
  [selectDraftState],
  (draft) => draft.winrates
);
