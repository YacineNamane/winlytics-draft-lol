import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAverageWinrate,
  selectWinrates,
} from "../features/draft/draftSelectors";
import {
  setWinrates,
  calculateAverageWinrate,
  resetSideDraft,
} from "../features/draft/draftSlice";
import { motion } from "framer-motion";

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

  const [animatedWR, setAnimatedWR] = useState(0);
  const [popEffect, setPopEffect] = useState(false);

  useEffect(() => {
    fetch("/src/winrate.json")
      .then((res) => res.json())
      .then((data) => dispatch(setWinrates(data)))
      .catch((err) => console.error("Erreur winrate:", err));
  }, [dispatch]);

  useEffect(() => {
    if (averageWinrate[side] !== null) {
      let start = 0;
      const end = parseFloat(averageWinrate[side]) || 0;
      const duration = 1000;
      const stepTime = 10;
      const steps = duration / stepTime;
      const increment = (end - start) / steps;

      const interval = setInterval(() => {
        start += increment;
        start = parseFloat(start);
        if (start >= end) {
          start = end;
          clearInterval(interval);
          setPopEffect(true);
          setTimeout(() => setPopEffect(false), 300);
        }
        setAnimatedWR(parseFloat(start.toFixed(2)));
      }, stepTime);
    }
  }, [averageWinrate[side], side]);

  const getWinrateForChampion = (championName) => {
    const champ = winrates.find((c) => c.champion === championName);
    return champ ? champ.winrate : "N/A";
  };

  const handleSimulate = () => {
    dispatch(calculateAverageWinrate());
  };

  const handleReset = () => {
    if (window.confirm(`Reset ${side} draft?`)) {
      dispatch(resetSideDraft(side));
    }
  };

  const renderDraft = () => (
    <div className="draft-section">
      <div className="draft-header">
        <h3>{side.toUpperCase()} Draft</h3>
        <button onClick={handleReset} className="reset-btn">
          Reset
        </button>
      </div>
      <div className="five-stack-draft">
        {Object.entries(draft).map(([role, champ]) =>
          champ ? (
            <motion.div
              key={`${side}-${role}`}
              className="draft-section-role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={roleLogos[role]}
                alt={role}
                style={{ width: "50px", height: "50px" }}
              />
              <p>{champ.name}</p>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ.image.full}`}
                alt={champ.name}
                style={{ width: "70px", height: "70px" }}
              />
              <p>WR: {getWinrateForChampion(champ.name)}%</p>
            </motion.div>
          ) : (
            <motion.div
              key={`${side}-${role}`}
              className="draft-role empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={roleLogos[role]}
                alt={role}
                style={{ width: "50px", height: "50px" }}
              />
              <p>Empty</p>
            </motion.div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="draft-container">
      {renderDraft()}

      <motion.div
        className={`sim-section ${
          draft && Object.values(draft).filter(Boolean).length === 5
            ? "visible"
            : "hidden-placeholder"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <button onClick={handleSimulate} className="simulate-btn">
          Simulate
        </button>
        {averageWinrate[side] !== null && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {side.toUpperCase()} WR :{" "}
            <motion.span
              className={popEffect ? "pop" : ""}
              animate={{ scale: popEffect ? 1.2 : 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {animatedWR}%
            </motion.span>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Draft;
