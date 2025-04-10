import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectDraft,
  selectAverageWinrate,
} from "../features/draft/draftSelectors";
import {
  setWinrates,
  calculateAverageWinrate,
} from "../features/draft/draftSlice";

const Draft = () => {
  const dispatch = useDispatch();
  const draft = useSelector(selectDraft);
  const winrates = useSelector((state) => state.draft.winrates);
  const averageWinrate = useSelector(selectAverageWinrate);

  useEffect(() => {
    fetch("/src/winrate.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setWinrates(data));
      })
      .catch((error) => console.error("Erreur chargement winrate:", error));
  }, [dispatch]);

  const handleSimulateDraft = () => {
    dispatch(calculateAverageWinrate());
  };

  const getWinrateForChampion = (championName) => {
    const championData = winrates.find(
      (item) => item.champion === championName
    );
    return championData ? championData.winrate : "N/A"; // En cas de pas de disponibilté de winrate
  };

  const roleLogos = {
    top: "/src/assets/Top.png",
    jungle: "/src/assets/Jungle.png",
    mid: "/src/assets/Mid.png",
    adc: "/src/assets/Adc.png",
    support: "/src/assets/Support.png",
  };

  return (
    <div className="draft-section">
      <div>
        <h2>Draft</h2>
      </div>

      <div className="five-stack-draft">
        {Object.entries(draft).map(
          ([role, champion]) =>
            champion && (
              <div key={role} className="draft-section-role">
                <img
                  className="role-icone"
                  src={roleLogos[role]}
                  alt={role}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginRight: "10px",
                  }}
                />
                <p>{champion.name}</p>
                <img
                  className="champion-draft-img"
                  src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
                  alt={champion.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />

                <p>WR: {getWinrateForChampion(champion.name)}%</p>
              </div>
            )
        )}
      </div>

      {Object.values(draft).filter(Boolean).length === 5 && (
        <div className="sim-section">
          <button onClick={handleSimulateDraft}>Simulate</button>
          {averageWinrate !== null && (
            <p>Average Winrate : {averageWinrate}%</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Draft;
