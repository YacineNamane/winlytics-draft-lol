import React from "react";
import { useSelector } from "react-redux";
import { selectDraft } from "../features/draft/draftSelectors";

const Draft = () => {
  const draft = useSelector(selectDraft);

  if (!draft || typeof draft !== "object") {
    return <p>loading draft...</p>;
  }

  return (
    <div className="draft-section">
      <h2>Draft </h2>
      {Object.entries(draft).map(([role, champion]) => (
        <div className="draft-section-role" key={role}>
          <h3>{role}</h3>
          <p>{champion ? champion.name : "Aucun champion sélectionné"}</p>
          {champion && (
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
              alt={champion.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Draft;
