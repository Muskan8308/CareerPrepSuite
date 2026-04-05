import React from "react";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        color: "#fff",
        backgroundColor: "#121212",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <h1>AI Powered Career Prep Suite</h1>
      <p>
        Your all-in-one platform for acing interviews, crafting the perfect
        resume, and building a thriving career path.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <FeatureCard
          color="#2563EB"
          icon="🎤"
          title="Interview Simulator"
          desc="Practice mock interviews powered by AI to get real-time feedback on your answers, tone, and body language."
          buttonText="Start Session"
          onClick={() => navigate("/interview")} // Navigate to Interview page
        />
        <FeatureCard
          color="#16A34A"
          icon="📄"
          title="Resume Analysis"
          desc="Generate a professional, ATS-friendly resume analysis using AI-driven suggestions."
          buttonText="Build My Resume"
          onClick={() => navigate("/resume")} // Navigate to Resume page
        />
        <FeatureCard
          color="#8B5CF6"
          icon="📊"
          title="Skill Gap Analysis"
          desc="Identify missing skills for your dream role and get personalized learning resources."
          buttonText="Analyze Skills"
          onClick={() => navigate("/skill-gap")}
        />
        <FeatureCard
          color="#dc6f26"
          icon="🛤️"
          title="Career Path Recommender"
          desc="Discover new career paths that align with your skills and interests and see the steps to get there."
          buttonText="Explore Paths"
          onClick={() => navigate("/career-path")}
        />
      </div>
    </div>
  );
}

export default Home;
