import React from "react";

const RoleCard = ({ role, champion }) => {
  return (
    <div className="role-card">
      <h3>{role}</h3>
      {champion ? (
        <>
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champion.image.full}`}
            alt={champion.name}
            style={{ width: "80px", height: "80px" }}
          />
          <p>{champion.name}</p>
        </>
      ) : (
        <p>Select a champion please !</p>
      )}
    </div>
  );
};

export default RoleCard;
