import { createSlice } from "@reduxjs/toolkit";
import { fetchChampions } from "./championsThunks";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

const championsSlice = createSlice({
  name: "champions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChampions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChampions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchChampions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default championsSlice.reducer;
