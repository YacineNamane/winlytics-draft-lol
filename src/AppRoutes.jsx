import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Data from "./pages/Data";
import ContributePage from "./pages/Contribute";

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/Contribute" element={<ContributePage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default AppRoutes;
