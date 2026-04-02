import React from "react";
import { Link } from "react-router-dom";

function ResumePage() {
  return (
    <div
      style={{
        color: "#fff",
        backgroundColor: "#121212",
        minHeight: "100vh",
        width : "100vw",
        padding: "2rem",
        
      }}
    >
      <h2>Resume Analysis</h2>
      <p>Upload your resume, here.</p>
      <Link to="/" style={{ color: "lightblue" }}>
        ← Back to Home
      </Link>
    </div>
  );
}

export default ResumePage;
