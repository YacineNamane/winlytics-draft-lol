import { createSelector } from "@reduxjs/toolkit";

export const selectDraftState = (state) => state.draft;

export const selectDraft = createSelector(
  [selectDraftState],
  (draft) => draft.roles
);

export const selectChampionForRole = (role) =>
  createSelector([selectDraft], (roles) => roles[role]);

export const selectAverageWinrate = createSelector(
  [selectDraftState],
  (draft) => draft.averageWinrate
);
