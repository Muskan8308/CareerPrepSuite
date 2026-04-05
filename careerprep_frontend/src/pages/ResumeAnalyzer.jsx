import React, { useState } from "react";
import { Link } from "react-router-dom";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("Software Engineer");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const analyzeResume = async () => {
    if (!file) {
      setError("Please upload a resume file!");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("jobTitle", jobTitle);

    try {
      const response = await fetch(
        "http://localhost:8080/api/resume/analyzer/upload-analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      setError("Backend error - Start Spring Boot on port 8080");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const uploadedFile = Array.from(e.dataTransfer.files)[0];
    if (
      uploadedFile &&
      (uploadedFile.name.endsWith(".pdf") ||
        uploadedFile.name.endsWith(".doc") ||
        uploadedFile.name.endsWith(".txt"))
    ) {
      setFile(uploadedFile);
      setError("");
    } else {
      setError("Please upload PDF, DOC, DOCX or TXT files only!");
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
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          backgroundColor: "rgba(30, 41, 59, 0.95)",
          borderRadius: "15px",
          padding: "2.5rem",
          boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            color: "#16A34A",
            marginBottom: "1.5rem",
            fontSize: "2.2rem",
          }}
        >
          📁 AI Resume Analyzer
        </h2>

        <p
          style={{ color: "#E5E7EB", fontSize: "1.1rem", marginBottom: "2rem" }}
        >
          Upload your resume file (PDF/DOC/TXT) for instant AI-powered ATS
          analysis!
        </p>

        {/* Job Title */}
        <input
          type="text"
          placeholder="Target Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={{
            width: "100%",
            padding: "1.2rem",
            borderRadius: "12px",
            border: "2px solid #16A34A",
            backgroundColor: "#374151",
            color: "#fff",
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        />

        {/* File Upload Area */}
        <div
          style={{
            border: `3px dashed ${dragActive ? "#10B981" : "#16A34A"}`,
            borderRadius: "15px",
            padding: "3rem 2rem",
            marginBottom: "2rem",
            backgroundColor: dragActive
              ? "rgba(16, 185, 129, 0.1)"
              : "rgba(22, 163, 74, 0.1)",
            cursor: "pointer",
            transition: "all 0.3s",
            position: "relative",
          }}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile) {
                setFile(selectedFile);
                setError("");
              }
            }}
            style={{ display: "none" }}
          />

          <div>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📎</div>
            <h3 style={{ color: "#E5E7EB", marginBottom: "0.5rem" }}>
              {dragActive
                ? "Drop your file here!"
                : "Drop resume file here or click to browse"}
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "1rem" }}>
              PDF, DOC, DOCX, TXT (Max 5MB)
            </p>
            {file && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.8rem",
                  background: "rgba(16, 185, 129, 0.3)",
                  borderRadius: "8px",
                  color: "#10B981",
                }}
              >
                ✅ Selected: {file.name}
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeResume}
          disabled={loading || !file}
          style={{
            padding: "1.2rem 3rem",
            background:
              loading || !file
                ? "#555"
                : "linear-gradient(45deg, #16A34A, #22C55E)",
            border: "none",
            borderRadius: "12px",
            color: "#fff",
            fontSize: "1.3rem",
            fontWeight: "bold",
            cursor: loading || !file ? "not-allowed" : "pointer",
            boxShadow: "0 6px 20px rgba(22, 163, 74, 0.4)",
            minWidth: "250px",
          }}
        >
          {loading ? "🔄 AI Analyzing..." : "🚀 Analyze Resume"}
        </button>

        {error && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid #EF4444",
              borderRadius: "10px",
              padding: "1rem",
              marginTop: "1.5rem",
              color: "#FECACA",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Results - Same as before */}
        {result && !result.error && (
          <div
            style={{
              marginTop: "3rem",
              textAlign: "left",
              background: "rgba(16, 163, 74, 0.1)",
              padding: "2rem",
              borderRadius: "15px",
              borderLeft: "5px solid #10B981",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                color: "#10B981",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {result.atsScore}%
            </div>
            <h3 style={{ color: "#10B981", margin: "1rem 0" }}>
              🎯 Analyzed: {result.filename}
            </h3>
            <p style={{ color: "#D1D5DB", fontSize: "1.1rem" }}>
              {result.feedback}
            </p>

            <div style={{ margin: "1.5rem 0" }}>
              <strong style={{ color: "#FCD34D" }}>✅ Strengths:</strong>
              <br />
              {(Array.isArray(result.strengths) ? result.strengths : []).map(
                (s, i) => (
                  <div
                    key={i}
                    style={{
                      color: "#D1D5DB",
                      margin: "0.5rem 0",
                      paddingLeft: "1rem",
                    }}
                  >
                    - {s}
                  </div>
                )
              )}
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
          padding: "0.5rem 1rem",
          background: "rgba(96, 165, 250, 0.1)",
          borderRadius: "8px",
          border: "1px solid #60A5FA",
        }}
      >
        ← Home
      </Link>
    </div>
  );
}

export default ResumeAnalyzer;
