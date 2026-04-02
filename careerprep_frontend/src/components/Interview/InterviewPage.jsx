import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InterviewPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch questions from backend on component mount
  useEffect(() => {
    fetch("http://localhost:8080/api/interview/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const startInterview = () => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setFeedback("");
    setIsFinished(false);
  };

  const submitAnswer = () => {
    // Simulate AI feedback by fetching from backend
    fetch("http://localhost:8080/api/interview/feedback")
      .then((response) => response.json())
      .then((data) => setFeedback(data.feedback))
      .catch((err) => setFeedback("Feedback unavailable. Try again!"));

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
    } else {
      setIsFinished(true);
    }
  };

  const restartInterview = () => {
    setIsStarted(false);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setFeedback("");
    setIsFinished(false);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #121212 0%, #1e1e2e 50%, #2a2a3e 100%)", // Colorful gradient background
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
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "rgba(30, 41, 59, 0.9)", // Semi-transparent card
          borderRadius: "15px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#60A5FA", marginBottom: "1rem" }}>
          Interview Simulator
        </h2>{" "}
        {/* Blue accent */}
        {!isStarted ? (
          <div>
            <p
              style={{
                color: "#E5E7EB",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              }}
            >
              Practice mock interviews with AI-powered feedback. Answer
              questions step-by-step and get instant tips!
            </p>
            <button
              onClick={startInterview}
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(45deg, #2563EB, #3B82F6)", // Blue gradient
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "1.2rem",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.4)",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Start Interview
            </button>
          </div>
        ) : isFinished ? (
          <div>
            <h3 style={{ color: "#10B981" }}>Interview Complete! 🎉</h3>{" "}
            {/* Green accent */}
            <p style={{ color: "#E5E7EB", marginBottom: "2rem" }}>
              Thank you for participating. Your final feedback:{" "}
              <strong style={{ color: "#F59E0B" }}>{feedback}</strong>
            </p>
            <button
              onClick={restartInterview}
              style={{
                padding: "0.5rem 1rem",
                background: "linear-gradient(45deg, #16A34A, #22C55E)", // Green gradient
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                marginRight: "1rem",
                boxShadow: "0 4px 10px rgba(22, 163, 74, 0.4)",
              }}
            >
              Restart
            </button>
            <Link
              to="/"
              style={{
                color: "#60A5FA",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              ← Back to Home
            </Link>
          </div>
        ) : (
          <div>
            <h3 style={{ color: "#F59E0B", marginBottom: "1rem" }}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h3>{" "}
            {/* Orange accent */}
            <p
              style={{
                color: "#E5E7EB",
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                fontWeight: "500",
              }}
            >
              {questions[currentQuestionIndex]?.question ||
                "Loading question..."}
            </p>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows="6"
              style={{
                width: "90%",
                padding: "1rem",
                borderRadius: "10px",
                border: "2px solid #60A5FA", // Blue border
                backgroundColor: "#374151",
                color: "#fff",
                fontSize: "1rem",
                marginBottom: "1.5rem",
                resize: "vertical",
              }}
            />
            {feedback && (
              <div
                style={{
                  background: "linear-gradient(45deg, #374151, #4B5563)", // Subtle gradient
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "1.5rem",
                  borderLeft: "5px solid #10B981", // Green left border
                }}
              >
                <strong style={{ color: "#10B981" }}>AI Feedback:</strong>{" "}
                <span style={{ color: "#E5E7EB" }}>{feedback}</span>
              </div>
            )}
            <button
              onClick={submitAnswer}
              disabled={!userAnswer.trim()}
              style={{
                padding: "0.75rem 1.5rem",
                background: userAnswer.trim()
                  ? "linear-gradient(45deg, #2563EB, #3B82F6)"
                  : "#555",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                cursor: userAnswer.trim() ? "pointer" : "not-allowed",
                boxShadow: userAnswer.trim()
                  ? "0 4px 15px rgba(37, 99, 235, 0.4)"
                  : "none",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.target.style.transform = userAnswer.trim()
                  ? "scale(1.05)"
                  : "none")
              }
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              Submit Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
