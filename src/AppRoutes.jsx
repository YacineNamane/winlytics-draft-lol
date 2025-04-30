import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sim from "./pages/Sim";
import Data from "./pages/Data";
import About from "./pages/About";
import ContributePage from "./pages/Contribute";

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sim" element={<Sim />} />
          <Route path="/data" element={<Data />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contribute" element={<ContributePage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default AppRoutes;
