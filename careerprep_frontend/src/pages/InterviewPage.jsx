import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function InterviewPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED: Questions fetch karne ka code
  useEffect(() => {
    fetch("http://localhost:8080/api/interview/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        setQuestions([
          { question: "Tell me about yourself.", id: "1" },
          { question: "Default question 2", id: "2" },
        ]);
      });
  }, []);

  const startInterview = () => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setUserAnswer("");
    setFeedback("");
    setIsFinished(false);
  };

  const submitAnswer = async () => {
    // ✅ FIXED: Real AI feedback with user answer
    try {
      const response = await fetch(
        "http://localhost:8080/api/interview/feedback",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answer: userAnswer }),
        }
      );
      const data = await response.json();
      setFeedback(data.feedback);
    } catch (err) {
      setFeedback("Great effort! Practice makes perfect. 😊");
    }

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

  if (loading) {
    return (
      <div
        style={{
          background:
            "linear-gradient(135deg, #121212 0%, #1e1e2e 50%, #2a2a3e 100%)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ color: "#60A5FA", fontSize: "1.5rem" }}>
          Loading questions...
        </div>
      </div>
    );
  }

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
          maxWidth: "700px",
          width: "100%",
          backgroundColor: "rgba(30, 41, 59, 0.9)",
          borderRadius: "15px",
          padding: "2rem",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#60A5FA", marginBottom: "1rem" }}>
          Interview Simulator
        </h2>

        {!isStarted ? (
          <div>
            <p
              style={{
                color: "#E5E7EB",
                fontSize: "1.1rem",
                marginBottom: "2rem",
              }}
            >
              Practice mock interviews with AI-powered feedback. Answer{" "}
              {questions.length} questions step-by-step!
            </p>
            <button
              onClick={startInterview}
              style={{
                padding: "1rem 2rem",
                background: "linear-gradient(45deg, #2563EB, #3B82F6)",
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
              🎤 Start Interview ({questions.length} Questions)
            </button>
          </div>
        ) : isFinished ? (
          <div>
            <h3 style={{ color: "#10B981" }}>🎉 Interview Complete!</h3>
            <p style={{ color: "#E5E7EB", marginBottom: "2rem" }}>
              Great job completing all {questions.length} questions!
            </p>
            <button
              onClick={restartInterview}
              style={{
                padding: "0.5rem 1rem",
                background: "linear-gradient(45deg, #16A34A, #22C55E)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                cursor: "pointer",
                marginRight: "1rem",
              }}
            >
              🔄 Restart
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
              Q{currentQuestionIndex + 1}/{questions.length}:{" "}
              {questions[currentQuestionIndex]?.question}
            </h3>

            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your detailed answer here..."
              rows="6"
              style={{
                width: "90%",
                padding: "1rem",
                borderRadius: "10px",
                border: "2px solid #60A5FA",
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
                  background: "linear-gradient(45deg, #374151, #4B5563)",
                  padding: "1rem",
                  borderRadius: "10px",
                  marginBottom: "1.5rem",
                  borderLeft: "5px solid #10B981",
                }}
              >
                <strong style={{ color: "#10B981" }}>🤖 AI Feedback:</strong>{" "}
                {feedback}
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
              }}
            >
              ✅ Submit & Next
            </button>
          </div>
        )}
      </div>
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
              
            >
              ← Back
            </Link>
    </div>
  );
}

export default InterviewPage;
