import { useState, useEffect } from "react";
import Banner from "../components/Banner";
import ChampionsList from "../components/ChampionsList";
import Draft from "../components/Draft";

const MOBILE_BREAKPOINT = 1300;

const Sim = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [view, setView] = useState("draft");

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <Banner />

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
        {!isMobile && (
          <>
            <Draft side="ally" />
            <ChampionsList />
            <Draft side="enemy" />
          </>
        )}

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
