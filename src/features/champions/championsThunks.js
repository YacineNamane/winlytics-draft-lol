// src/features/champions/championsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";

// Créer un thunk pour récupérer les champions
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
