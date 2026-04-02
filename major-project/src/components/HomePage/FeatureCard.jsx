import React from "react";

function FeatureCard({ color, icon, title, desc, buttonText, onClick }) {
  return (
    <div
      style={{
        backgroundColor: "#1E293B",
        borderRadius: "8px",
        flex: "1 1 250px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div style={{ fontSize: "2rem", color }}>{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <button
        onClick={onClick}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: color,
          border: "none",
          borderRadius: "5px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default FeatureCard;
