import React, { useState } from "react";
import { Link } from "react-router-dom";

function SkillGapAnalyzer() {
  const [formData, setFormData] = useState({
    userSkills: "",
    targetJob: "Software Engineer",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSkills = async () => {
    if (!formData.userSkills.trim()) {
      alert("Enter your current skills!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/api/skills/gap/analyze",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      alert("Backend error - port 8080");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #121212 0%, #1e1e2e 50%, #2a2a3e 100%)",
        minHeight: "100vh",
        minWidth: "100vh",
        padding: "2rem",
        margin : "2rem 6rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          width: "100%",
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          borderRadius: "20px",
          padding: "3rem 2.5rem",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#8B5CF6",
            marginBottom: "1.5rem",
            fontSize: "2.5rem",
          }}
        >
          📊 Skill Gap Analyzer
        </h2>

        <p
          style={{
            color: "#E5E7EB",
            fontSize: "1.2rem",
            marginBottom: "2.5rem",
          }}
        >
          Enter your skills to discover gaps for your dream job + get
          personalized learning roadmap!
        </p>

        {/* Target Job */}
        <input
          type="text"
          placeholder="Target Job (Software Engineer, Data Scientist...)"
          value={formData.targetJob}
          onChange={(e) =>
            setFormData({ ...formData, targetJob: e.target.value })
          }
          style={{
            width: "100%",
            padding: "1.3rem",
            borderRadius: "15px",
            border: "2px solid #8B5CF6",
            backgroundColor: "#374151",
            color: "#fff",
            fontSize: "1.2rem",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "500",
          }}
        />

        {/* User Skills */}
        <textarea
          placeholder="Your current skills (comma separated): react, javascript, git..."
          value={formData.userSkills}
          onChange={(e) =>
            setFormData({ ...formData, userSkills: e.target.value })
          }
          rows="4"
          style={{
            width: "100%",
            padding: "1.5rem",
            borderRadius: "15px",
            border: "2px solid #8B5CF6",
            backgroundColor: "#374151",
            color: "#fff",
            fontSize: "1.1rem",
            marginBottom: "2.5rem",
            resize: "vertical",
            fontFamily: "monospace",
          }}
        />

        {/* Analyze Button */}
        <button
          onClick={analyzeSkills}
          disabled={loading || !formData.userSkills.trim()}
          style={{
            padding: "1.4rem 3.5rem",
            background:
              loading || !formData.userSkills.trim()
                ? "#555"
                : "linear-gradient(45deg, #8B5CF6, #A78BFA)",
            border: "none",
            borderRadius: "15px",
            color: "#fff",
            fontSize: "1.4rem",
            fontWeight: "bold",
            cursor:
              loading || !formData.userSkills.trim()
                ? "not-allowed"
                : "pointer",
            boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
            minWidth: "280px",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            if (!loading && formData.userSkills.trim()) {
              e.target.style.transform = "scale(1.05)";
            }
          }}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "🔄 Analyzing Skills..." : "🚀 Find My Skill Gaps"}
        </button>

        {/* Results */}
        {result && (
          <div
            style={{
              marginTop: "3rem",
              textAlign: "left",
              background: "rgba(139, 92, 246, 0.1)",
              padding: "2.5rem",
              borderRadius: "20px",
              borderLeft: "6px solid #8B5CF6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem",
              }}
            >
              <h2 style={{ color: "#8B5CF6", margin: 0 }}>
                {result.targetJob.toUpperCase()}
              </h2>
              <div
                style={{
                  fontSize: "3.5rem",
                  color: result.matchPercentage > 70 ? "#10B981" : "#F59E0B",
                  fontWeight: "bold",
                }}
              >
                {result.matchPercentage}%
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              {/* Current Skills */}
              <div>
                <h3 style={{ color: "#10B981", marginBottom: "1rem" }}>
                  ✅ You Have ({result.currentSkills.length}/
                  {result.requiredSkillsCount})
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {result.currentSkills.map((skill, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#10B981",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              <div>
                <h3 style={{ color: "#F59E0B", marginBottom: "1rem" }}>
                  🔥 Learn These ({result.skillGaps.length})
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {result.skillGaps.map((gap, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "0.5rem 1rem",
                        background: "#F59E0B",
                        color: "white",
                        borderRadius: "20px",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                      }}
                    >
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learning Roadmap */}
            {result.learningResources &&
              Object.keys(result.learningResources).length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                  <h3 style={{ color: "#60A5FA", marginBottom: "1.5rem" }}>
                    📚 Learning Roadmap
                  </h3>
                  {Object.entries(result.learningResources).map(
                    ([skill, resource]) => (
                      <div
                        key={skill}
                        style={{
                          background: "rgba(96, 165, 250, 0.2)",
                          padding: "1.2rem",
                          borderRadius: "12px",
                          marginBottom: "1rem",
                          borderLeft: "4px solid #60A5FA",
                        }}
                      >
                        <strong style={{ color: "#60A5FA" }}>
                          🎯 {skill.toUpperCase()}
                        </strong>
                        <p style={{ color: "#D1D5DB", margin: "0.5rem 0 0 0" }}>
                          {resource}
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}

            <div
              style={{
                marginTop: "2rem",
                padding: "1.5rem",
                background: "rgba(34, 197, 94, 0.2)",
                borderRadius: "12px",
                borderLeft: "4px solid #10B981",
              }}
            >
              <h4 style={{ color: "#10B981" }}>
                ⏱️ Estimated Time: {result.timeToLearn}
              </h4>
              <ul
                style={{
                  color: "#D1D5DB",
                  textAlign: "left",
                  marginTop: "0.5rem",
                }}
              >
                {result.recommendations.map((rec, i) => (
                  <li key={i} style={{ margin: "0.3rem 0" }}>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <Link
        to="/"
        style={{
          position: "fixed",
          top: "2rem",
          left: "2rem",
          color: "#60A5FA",
          textDecoration: "none",
          fontWeight: "bold",
          padding: "0.7rem 1.2rem",
          background: "rgba(96, 165, 250, 0.2)",
          borderRadius: "10px",
          border: "2px solid #60A5FA",
          fontSize: "1rem",
        }}
      >
        ← Home
      </Link>
    </div>
  );
}

export default SkillGapAnalyzer;
