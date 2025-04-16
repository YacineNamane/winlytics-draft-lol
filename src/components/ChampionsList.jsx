import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChampions } from "../features/champions/championsThunks";
import {
  selectAllChampions,
  selectChampionsStatus,
  selectChampionsError,
} from "../features/champions/championsSelectors";
import { selectChampion, switchActiveSide } from "../features/draft/draftSlice";
import { selectActiveSide } from "../features/draft/draftSelectors";

const roles = ["top", "jungle", "mid", "adc", "support"];

const ChampionsList = () => {
  const dispatch = useDispatch();
  const champions = useSelector(selectAllChampions);
  const status = useSelector(selectChampionsStatus);
  const error = useSelector(selectChampionsError);
  const activeSide = useSelector(selectActiveSide);

  const [selectedChampion, setSelectedChampion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  const handleChampionClick = (champion) => {
    setSelectedChampion(champion);
  };

  const handleRoleSelect = (role) => {
    if (selectedChampion) {
      dispatch(selectChampion({ role, champion: selectedChampion }));
      setSelectedChampion(null);
    }
  };

  const handleSwitchSide = () => {
    dispatch(switchActiveSide());
  };

  const filteredChampions = champions.filter((champion) =>
    champion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (status === "loading") return <p>loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="champions-pannel">
      <h2>List of Champions</h2>
      <div className="cl-header">
        <div>
          <p>
            Active Draft: <strong>{activeSide.toUpperCase()}</strong>
          </p>
        </div>
        <button onClick={handleSwitchSide}>
          Switch to {activeSide === "ally" ? "ENEMY" : "ALLY"} Draft
        </button>

        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="champions-section">
        {filteredChampions.map((champion) => (
          <div
            className="champions-icon-select"
            key={champion.id}
            style={{ marginBottom: "20px" }}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
              alt={champion.name}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <h3>{champion.name}</h3>
            <button onClick={() => handleChampionClick(champion)}>
              LOCK IN
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
