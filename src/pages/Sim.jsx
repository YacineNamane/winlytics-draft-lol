import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ChampionsList from "../components/ChampionsList";
import Draft from "../components/Draft";

const MOBILE_BREAKPOINT = 1300; // 💬 Plus clair

const Sim = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState("draft"); // 'draft' ou 'champions'

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        // 🛡️ Protection (future proof)
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };

    handleResize(); // Initialisation

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Banner />

      {/* Mobile : boutons swap view */}
      <div className="swap-buttons-section">
        <button
          onClick={() => setView("draft")}
          className={view === "draft" ? "active" : ""}
        >
          Draft
        </button>
        <button
          onClick={() => setView("champions")}
          className={view === "champions" ? "active" : ""}
        >
          Champion Select
        </button>
      </div>

      <div className="draft-lollike">
        {/* Desktop : afficher tout */}
        {!isMobile && (
          <>
            <Draft side="ally" />
            <ChampionsList />
            <Draft side="enemy" />
          </>
        )}

        {/* Mobile : afficher selon la vue choisie */}
        {isMobile && (
          <>
            {view === "draft" && (
              <>
                <Draft side="ally" />
                <Draft side="enemy" />
              </>
            )}
            {view === "champions" && <ChampionsList />}
          </>
        )}
      </div>
    </div>
  );
};

export default Sim;
