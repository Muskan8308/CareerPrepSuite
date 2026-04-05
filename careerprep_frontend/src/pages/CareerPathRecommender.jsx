import React, { useState } from "react";
import { Link } from "react-router-dom";

function CareerPathRecommender() {
  const [formData, setFormData] = useState({
    skills: "",
    experience: "1"
  });
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const findCareerPaths = async () => {
    if (!formData.skills.trim()) {
      setError("Please enter your skills!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/career/path/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error("API Error");
      
      const data = await response.json();
      setPaths(data);
    } catch (err) {
      setError("Backend not running? Start `mvn spring-boot:run` on port 8080");
      console.error("Career API Error:", err);
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
        minWidth: "100vw",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // ✅ FIXED: Perfect center
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "900px", // ✅ Slightly wider for better look
          width: "90%",
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          borderRadius: "25px",
          padding: "3rem 2.5rem",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <h2
          style={{
            color: "#dc6f26",
            fontSize: "2.8rem",
            marginBottom: "1rem",
            fontWeight: "800",
          }}
        >
          🛤️ Career Path Finder
        </h2>
        <p
          style={{
            color: "#E5E7EB",
            fontSize: "1.3rem",
            marginBottom: "2.5rem",
            lineHeight: "1.6",
          }}
        >
          Enter your skills & experience - Get AI-powered career recommendations
          with salary and roadmap!
        </p>

        {/* Form - Perfect Center */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Skills Input */}
          <div style={{ width: "100%", maxWidth: "700px" }}>
            <label
              style={{
                color: "#FCA5A5",
                fontWeight: "bold",
                marginBottom: "1rem",
                display: "block",
                fontSize: "1.2rem",
              }}
            >
              🎯 Your Skills (comma separated)
            </label>
            <textarea
              placeholder="react, javascript, git, python, aws..."
              value={formData.skills}
              onChange={(e) =>
                setFormData({ ...formData, skills: e.target.value })
              }
              rows="3"
              style={{
                width: "100%",
                padding: "1.5rem 1.2rem",
                borderRadius: "15px",
                border: "3px solid #dc6f26",
                backgroundColor: "#1F2937",
                color: "#F3F4F6",
                fontSize: "1.1rem",
                resize: "vertical",
                fontFamily: "'Courier New', monospace",
                lineHeight: "1.5",
              }}
            />
          </div>

          {/* Experience Input */}
          <div style={{ width: "100%", maxWidth: "400px" }}>
            <label
              style={{
                color: "#FCA5A5",
                fontWeight: "bold",
                marginBottom: "1rem",
                display: "block",
                fontSize: "1.2rem",
              }}
            >
              📈 Years of Experience
            </label>
            <input
              type="number"
              min="0"
              max="20"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              placeholder="1"
              style={{
                width: "100%",
                padding: "1.5rem 1.2rem",
                borderRadius: "15px",
                border: "3px solid #dc6f26",
                backgroundColor: "#1F2937",
                color: "#F3F4F6",
                fontSize: "1.6rem",
                textAlign: "center",
                fontWeight: "600",
              }}
            />
          </div>
        </div>

        {/* Analyze Button - Perfect Center */}
        <button
          onClick={findCareerPaths}
          disabled={loading || !formData.skills.trim()}
          style={{
            display: "block",
            margin: "0 auto",
            padding: "1.5rem 4rem",
            background:
              loading || !formData.skills.trim()
                ? "#4B5563"
                : "linear-gradient(45deg, #dc6f26, #EF4444)",
            border: "none",
            borderRadius: "20px",
            color: "#FFFFFF",
            fontSize: "1.5rem",
            fontWeight: "800",
            cursor:
              loading || !formData.skills.trim() ? "not-allowed" : "pointer",
            boxShadow: "0 12px 35px rgba(220, 38, 38, 0.5)",
            minWidth: "320px",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
            if (!loading && formData.skills.trim()) {
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 18px 45px rgba(220, 38, 38, 0.6)";
            }
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 12px 35px rgba(220, 38, 38, 0.5)";
          }}
        >
          {loading ? "🔍 AI Finding Paths..." : "🎯 Discover My Careers"}
        </button>

        {/* Error */}
        {error && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "rgba(239, 68, 68, 0.2)",
              border: "2px solid #EF4444",
              borderRadius: "15px",
              color: "#FECACA",
              maxWidth: "600px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Results - Scrollable if many */}
        {paths.length > 0 && (
          <div
            style={{
              marginTop: "4rem",
              maxHeight: "70vh",
              overflowY: "auto",
              paddingRight: "1rem",
            }}
          >
            <h3
              style={{
                color: "#FCA5A5",
                textAlign: "center",
                fontSize: "2.2rem",
                marginBottom: "2.5rem",
              }}
            >
              🔥 Top {paths.length} Perfect Career Paths
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
              }}
            >
              {paths.map((path, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(220, 38, 38, 0.15)",
                    padding: "2.5rem 2rem",
                    borderRadius: "25px",
                    borderLeft: "6px solid #dc6f26",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(228, 141, 90, 0.3)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(156, 98, 59, 0.2)";
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "2rem",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <h2
                      style={{
                        color: "#FCA5A5",
                        fontSize: "2.2rem",
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {path.title}
                    </h2>
                    <div
                      style={{
                        fontSize: "3rem",
                        color:
                          path.matchScore > 80
                            ? "#10B981"
                            : path.matchScore > 60
                            ? "#FBBF24"
                            : "#F59E0B",
                        fontWeight: "bold",
                        textShadow: "0 0 10px currentColor",
                      }}
                    >
                      {path.matchScore}%
                    </div>
                  </div>

                  {/* Stats */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1.5rem",
                      marginBottom: "2rem",
                    }}
                  >
                    <div style={{ textAlign: "center", padding: "1.5rem" }}>
                      <div style={{ fontSize: "2.8rem", color: "#10B981" }}>
                        💰
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          color: "#D1D5DB",
                          fontWeight: "600",
                        }}
                      >
                        {path.salary}
                      </div>
                    </div>
                    <div style={{ textAlign: "center", padding: "1.5rem" }}>
                      <div style={{ fontSize: "2.8rem", color: "#FBBF24" }}>
                        📈
                      </div>
                      <div
                        style={{
                          fontSize: "1.4rem",
                          color: "#D1D5DB",
                          fontWeight: "600",
                        }}
                      >
                        {path.growth}
                      </div>
                    </div>
                    <div style={{ textAlign: "center", padding: "1.5rem" }}>
                      <div style={{ fontSize: "2.8rem", color: "#3B82F6" }}>
                        ⭐
                      </div>
                      <div style={{ fontSize: "1.2rem", color: "#9CA3AF" }}>
                        {path.skillMatchCount}/{path.requiredSkills.length}{" "}
                        skills
                      </div>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "2rem",
                      borderRadius: "18px",
                      borderLeft: "4px solid #FCA5A5",
                    }}
                  >
                    <strong
                      style={{
                        color: "#FCA5A5",
                        display: "block",
                        marginBottom: "1.2rem",
                        fontSize: "1.3rem",
                      }}
                    >
                      🚀 Next Steps to Get There:
                    </strong>
                    <p
                      style={{
                        color: "#E5E7EB",
                        lineHeight: "1.7",
                        margin: 0,
                        fontSize: "1.1rem",
                      }}
                    >
                      {path.nextSteps}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back Button - Fixed Position */}
      <Link
        to="/"
        style={{
          position: "fixed",
          top: "2.5rem",
          left: "2rem",
          color: "#60A5FA",
          textDecoration: "none",
          fontWeight: "bold",
          padding: "1rem 1.8rem",
          background: "rgba(96, 165, 250, 0.15)",
          borderRadius: "15px",
          border: "2px solid #60A5FA",
          fontSize: "1rem",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "rgba(96, 165, 250, 0.25)";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "rgba(96, 165, 250, 0.15)";
          e.target.style.transform = "scale(1)";
        }}
      >
        ← Back
      </Link>
    </div>
  );
}

export default CareerPathRecommender;