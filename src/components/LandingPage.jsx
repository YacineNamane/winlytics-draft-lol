import React, { useState } from "react";
import OverlayYone from "../assets/OverlayYone.webp";
import { useNavigate } from "react-router-dom";
import TypewriterText from "./TypeWriter";

const LandingPage = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/Sim");
    }, 1000);
  };

  return (
    <div
      className={`landing-page ${fadeOut ? "fade-out" : "fade-in"}`}
      style={{
        backgroundImage: `url(${OverlayYone})`,
      }}
    >
      <div
        className="type-container"
        style={{ fontSize: "2rem", marginBottom: "1rem" }}
      >
        <TypewriterText />
      </div>
      <div className="button-type-container">
        <button onClick={handleStart}>Start Simming</button>
      </div>
    </div>
  );
};

export default LandingPage;
