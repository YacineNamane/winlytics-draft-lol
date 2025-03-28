import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";

const AppRoutes = () => {
  return (
    <React.StrictMode>
      <Router basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default AppRoutes;
