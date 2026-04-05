

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import InterviewPage from "./pages/InterviewPage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import SkillGapAnalyzer from "./pages/SkillGapAnalyzer";
import CareerPathRecommender from "./pages/CareerPathRecommender";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
        <Route path="/skill-gap" element={<SkillGapAnalyzer />} />
        <Route path="/career-path" element={<CareerPathRecommender />} />
      </Routes>
    </Router>
  );
}
