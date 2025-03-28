// src/components/ChampionsList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChampions } from "../features/champions/championsThunks";
import {
  selectAllChampions,
  selectChampionsStatus,
  selectChampionsError,
} from "../features/champions/championsSelectors";

const ChampionsList = () => {
  const dispatch = useDispatch();
  const champions = useSelector(selectAllChampions);
  const status = useSelector(selectChampionsStatus);
  const error = useSelector(selectChampionsError);

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  if (status === "loading") return <p>Chargement...</p>;
  if (status === "failed") return <p>Erreur: {error}</p>;

  return (
    <div>
      <h2>Liste of Champions</h2>
      <div className="champions-section">
        {champions.map((champion) => (
          <div key={champion.id} style={{ marginBottom: "20px" }}>
            <h3>{champion.name}</h3>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
              alt={champion.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }} // Ajuste la taille de l'image
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChampionsList;
