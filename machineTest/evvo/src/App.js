import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import ApplyLeavePage from "./components/ApplyLeavePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/apply-leave" element={<ApplyLeavePage />} />
      </Routes>
    </Router>
  );
}

export default App;
