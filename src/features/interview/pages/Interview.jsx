import React, { useEffect, useState } from "react";
import "./Interview.css";
import useInterview from "../hooks/useInterview";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

function Interview() {
  const [activeTab, setActiveTab] = useState("technical");

  const { report, getReportById, loading, getResumePdf } = useInterview();

  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  useEffect(() => {
    console.log("ID:", interviewId);
    if (interviewId) {
      getReportById(interviewId);
    }
  }, [interviewId]);

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };
  if (loading || !report) {
    return (
      <div className="loading">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="interview-container">
      {/* LEFT SIDEBAR */}
      <div className="sidebar">
        <button
          className={activeTab === "technical" ? "active" : ""}
          onClick={() => setActiveTab("technical")}
        >
          Technical Questions
        </button>

        <button
          className={activeTab === "behavioral" ? "active" : ""}
          onClick={() => setActiveTab("behavioral")}
        >
          Behavioral Questions
        </button>

        <button
          className={activeTab === "roadmap" ? "active" : ""}
          onClick={() => setActiveTab("roadmap")}
        >
          Road Map
        </button>

        <button
          className="download-btn"
          onClick={() => getResumePdf(interviewId)}
        >
          Download Resume
        </button>
        <button onClick={logoutUser}>Logout</button>
      </div>

      {/* CENTER CONTENT */}
      <div className="content">
        {activeTab === "technical" && (
          <>
            <h2>Technical Questions</h2>

            {report.technicalQuestions.map((item, index) => (
              <details key={index} className="card">
                <summary>{item.question}</summary>

                <p>
                  <strong>Intention:</strong>
                  {item.intention}
                </p>

                <p>
                  <strong>Answer:</strong>
                  {item.answer}
                </p>
              </details>
            ))}
          </>
        )}

        {activeTab === "behavioral" && (
          <>
            <h2>Behavioral Questions</h2>

            {report.behavioralQuestions.map((item, index) => (
              <details key={index} className="card">
                <summary>{item.question}</summary>

                <p>
                  <strong>Intention:</strong>
                  {item.intention}
                </p>

                <p>
                  <strong>Answer:</strong>
                  {item.answer}
                </p>
              </details>
            ))}
          </>
        )}

        {activeTab === "roadmap" && (
          <>
            <h2>Preparation Plan</h2>

            {report.preparationPlan.map((day, index) => (
              <div key={index} className="card">
                <h3>
                  Day {day.day} - {day.focus}
                </h3>

                <ul>
                  {day.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="right-sidebar">
        <div className="score-box">
          <h3>Match Score</h3>

          <div className="score">{report.matchScore}%</div>
        </div>

        <div className="skill-box">
          <h3>Skill Gaps</h3>

          {report.skillGaps.map((gap, index) => (
            <div key={index} className="skill">
              {gap.skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Interview;
