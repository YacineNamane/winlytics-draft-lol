import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchChampions = createAsyncThunk(
  "champions/fetchChampions",
  async () => {
    const response = await fetch(
      "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json"
    );
    const data = await response.json();
    return Object.values(data.data);
  }
);
