import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterText = () => {
  return (
    <div className="welcome-section">
      <div className="welcome-section-title">
        {" "}
        <span> Welcome to ,</span> <br />{" "}
        <h1>
          {" "}
          Winlystics Draft <br />
          LOL
        </h1>
      </div>
      <Typewriter
        options={{
          autoStart: true,
          delay: 150,
        }}
        onInit={(typewriter) => {
          typewriter
            .typeString("<br/>Here you can Simulate your draft WinRate")
            .pauseFor(900)
            .typeString("<br/>Set-up better comps, climb smarter!")
            .pauseFor(900)
            .start();
        }}
      />
    </div>
  );
};

export default TypewriterText;
