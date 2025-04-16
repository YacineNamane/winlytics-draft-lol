import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRolesBySide,
  selectAverageWinrate,
  selectWinrates,
} from "../features/draft/draftSelectors";
import {
  setWinrates,
  calculateAverageWinrate,
} from "../features/draft/draftSlice";

const roleLogos = {
  top: "/src/assets/Top.png",
  jungle: "/src/assets/Jungle.png",
  mid: "/src/assets/Mid.png",
  adc: "/src/assets/Adc.png",
  support: "/src/assets/Support.png",
};

const Draft = ({ side }) => {
  const dispatch = useDispatch();
  const draft = useSelector((state) => state.draft[side]);
  const winrates = useSelector(selectWinrates);
  const averageWinrate = useSelector(selectAverageWinrate);

  useEffect(() => {
    fetch("/src/winrate.json")
      .then((res) => res.json())
      .then((data) => dispatch(setWinrates(data)))
      .catch((err) => console.error("Erreur winrate:", err));
  }, [dispatch]);

  const getWinrateForChampion = (championName) => {
    const champ = winrates.find((c) => c.champion === championName);
    return champ ? champ.winrate : "N/A";
  };

  const handleSimulate = () => {
    dispatch(calculateAverageWinrate());
  };

  const renderDraft = () => (
    <div className="draft-section">
      <h3>{side.toUpperCase()} DRAFT</h3>
      <div className="five-stack-draft">
        {Object.entries(draft).map(([role, champ]) =>
          champ ? (
            <div key={`${side}-${role}`} className="draft-section-role">
              <img
                src={roleLogos[role]}
                alt={role}
                style={{ width: "50px", height: "50px" }}
              />
              <p>{champ.name}</p>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ.image.full}`}
                alt={champ.name}
                style={{ width: "90px", height: "90px" }}
              />
              <p>WR: {getWinrateForChampion(champ.name)}%</p>
            </div>
          ) : (
            <div key={`${side}-${role}`} className="draft-role empty">
              <img
                src={roleLogos[role]}
                alt={role}
                style={{ width: "50px", height: "50px" }}
              />
              <p>Empty</p>
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="draft-container">
      {renderDraft()}

      <div
        className={`sim-section ${
          draft && Object.values(draft).filter(Boolean).length === 5
            ? "visible"
            : "hidden-placeholder"
        }`}
      >
        <button onClick={handleSimulate}>Simulate</button>
        {averageWinrate[side] !== null && (
          <p>
            {side.toUpperCase()} Avg WR: {averageWinrate[side]}%
          </p>
        )}
      </div>
    </div>
  );
};

export default Draft;
