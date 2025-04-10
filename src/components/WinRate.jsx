import React, { useState, useEffect } from "react";

const ProcessedData = () => {
  const [data, setData] = useState([]);
  const [champions, setChampions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWinrateData = fetch("/src/winrate.json").then((res) =>
      res.json()
    );

    const fetchChampionsData = fetch(
      "https://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json"
    ).then((res) => res.json());

    Promise.all([fetchWinrateData, fetchChampionsData])
      .then(([winrateData, championsData]) => {
        const processed = calculateAverages(winrateData);
        setData(processed);

        const championArray = Object.values(championsData.data);
        setChampions(championArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement :", error);
        setLoading(false);
      });
  }, []);

  const calculateAverages = (data) => {
    const grouped = {};

    data.forEach(({ champion, winrate, pickrate, banrate }) => {
      if (!grouped[champion]) {
        grouped[champion] = {
          totalWinrate: 0,
          totalPickrate: 0,
          totalBanrate: 0,
          count: 0,
        };
      }
      grouped[champion].totalWinrate += winrate;
      grouped[champion].totalPickrate += pickrate;
      grouped[champion].totalBanrate += banrate;
      grouped[champion].count += 1;
    });

    return Object.keys(grouped).map((champion) => ({
      champion,
      winrate: (
        grouped[champion].totalWinrate / grouped[champion].count
      ).toFixed(2),
      pickrate: (
        grouped[champion].totalPickrate / grouped[champion].count
      ).toFixed(2),
      banrate: (
        grouped[champion].totalBanrate / grouped[champion].count
      ).toFixed(2),
    }));
  };

  const getChampionSplash = (championName) => {
    // Essaye de trouver un champion existant dans les données
    const champ = champions.find((c) => c.name === championName);

    if (champ) {
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`;
    }

    // Si non trouvé, on tente une version "formatée"
    const fallbackName = championName
      .normalize("NFD") // enlève les accents
      .replace(/[\u0300-\u036f]/g, "") // supprime les caractères diacritiques
      .replace(/[^a-zA-Z0-9]/g, "") // supprime tout caractère non alphanumérique
      .replace(/\s+/g, ""); // supprime les espaces

    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${fallbackName}_0.jpg`;
  };

  const getBarColor = (value) => {
    if (value >= 50) return "#4CAF50"; // vert
    if (value >= 30) return "#FFC107"; // jaune
    return "#F44336"; // rouge
  };

  const renderBar = (value) => (
    <div style={{ backgroundColor: "#ddd", borderRadius: 4, height: 20 }}>
      <div
        style={{
          width: `${value}%`,
          backgroundColor: getBarColor(value),
          height: "100%",
          borderRadius: 4,
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>Champions Stats | Last Update 02/04/2025</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table
          style={{ width: "80%", borderCollapse: "collapse", margin: "auto" }}
        >
          <thead>
            <tr>
              <th>Champion</th>
              <th>Winrate</th>
              <th>Pickrate</th>
              <th>Banrate</th>
            </tr>
          </thead>
          <tbody style={{ width: "80%" }}>
            {data.map((champ) => (
              <tr key={champ.champion} style={{ textAlign: "center" }}>
                <td
                  style={{
                    padding: "10px",
                    position: "relative",
                    width: "25%",
                  }}
                >
                  <img
                    src={getChampionSplash(champ.champion)}
                    alt={champ.champion}
                    style={{
                      borderRadius: 8,
                      marginBottom: 8,
                      width: 270,
                      height: 110,
                      objectFit: "cover",
                    }}
                  />
                  {/* Nom du champion en haut à droite */}
                  <div
                    style={{
                      position: "absolute",
                      top: "8px", // Espace du haut
                      left: "8px", // Espace de gauche
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      color: "#fff",
                      fontSize: "14px", // Ajuste la taille du texte si nécessaire
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "5px",
                    }}
                  >
                    {champ.champion}
                  </div>
                </td>
                <td>
                  <div>{champ.winrate}%</div>
                  {renderBar(parseFloat(champ.winrate))}
                </td>
                <td>
                  <div>{champ.pickrate}%</div>
                  {renderBar(parseFloat(champ.pickrate))}
                </td>
                <td>
                  <div>{champ.banrate}%</div>
                  {renderBar(parseFloat(champ.banrate))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProcessedData;
