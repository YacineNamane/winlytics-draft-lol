// src/components/ChampionsList.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChampions } from "../features/champions/championsThunks";
import {
  selectAllChampions,
  selectChampionsStatus,
  selectChampionsError,
} from "../features/champions/championsSelectors";
import { selectChampion } from "../features/draft/draftSlice";

const roles = ["top", "jungle", "mid", "adc", "support"];

const ChampionsList = () => {
  const dispatch = useDispatch();
  const champions = useSelector(selectAllChampions);
  const status = useSelector(selectChampionsStatus);
  const error = useSelector(selectChampionsError);
  const [selectedChampion, setSelectedChampion] = useState(null);

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  if (status === "loading") return <p>loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  const handleChampionClick = (champion) => {
    setSelectedChampion(champion);
  };

  const handleRoleSelect = (role) => {
    if (selectedChampion) {
      dispatch(selectChampion({ role, champion: selectedChampion }));
      setSelectedChampion(null);
    }
  };

  return (
    <div className="champions-pannel">
      <h2>List of Champions</h2>
      <div className="champions-section">
        {champions.map((champion) => (
          <div key={champion.id} style={{ marginBottom: "20px" }}>
            <h3>{champion.name}</h3>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
              alt={champion.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <button onClick={() => handleChampionClick(champion)}>
              Select
            </button>
          </div>
        ))}
      </div>

      {selectedChampion && (
        <div className="role-selection">
          <h3>Choose a role for {selectedChampion.name}</h3>
          {roles.map((role) => (
            <button key={role} onClick={() => handleRoleSelect(role)}>
              {role.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChampionsList;
