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
import RoleModalBootstrap from "./RoleModal";

const roles = ["top", "jungle", "mid", "adc", "support"];
const rolesWithIcons = [
  { name: "top", iconPath: "/src/assets/Top.png" },
  { name: "jungle", iconPath: "/src/assets/Jungle.png" },
  { name: "mid", iconPath: "/src/assets/Mid.png" },
  { name: "adc", iconPath: "/src/assets/Adc.png" },
  { name: "support", iconPath: "/src/assets/Support.png" },
];

const ChampionsList = () => {
  const dispatch = useDispatch();
  const champions = useSelector(selectAllChampions);
  const status = useSelector(selectChampionsStatus);
  const error = useSelector(selectChampionsError);
  const activeSide = useSelector(selectActiveSide);

  const [searchQuery, setSearchQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [pendingChampion, setPendingChampion] = useState(null);

  useEffect(() => {
    dispatch(fetchChampions());
  }, [dispatch]);

  const handleChampionClick = (champion) => {
    setPendingChampion(champion);
    setModalShow(true);
  };

  const handleRoleSelect = (role) => {
    if (pendingChampion) {
      dispatch(selectChampion({ role, champion: pendingChampion }));
      setPendingChampion(null);
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
      <h2>Champion Selection </h2>

      <div className="cl-header">
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="draft-team-selection">
          <button
            className={`btn ${
              activeSide === "Ally" ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => {
              if (activeSide !== "Ally") dispatch(switchActiveSide());
            }}
          >
            Ally
          </button>
          <button
            className={`btn ${
              activeSide === "Enemy" ? "btn-success" : "btn-secondary"
            }`}
            onClick={() => {
              if (activeSide !== "Enemy") dispatch(switchActiveSide());
            }}
            style={{ marginLeft: "10px" }}
          >
            Enemy
          </button>
          <p>
            Selecting for : <span>{activeSide} </span>
          </p>
        </div>
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

      <RoleModalBootstrap
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setPendingChampion(null);
        }}
        roles={rolesWithIcons}
        onSelect={(role) => {
          handleRoleSelect(role);
          setModalShow(false);
        }}
      />
    </div>
  );
};

export default ChampionsList;
