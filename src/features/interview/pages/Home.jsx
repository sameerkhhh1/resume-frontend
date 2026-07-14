import React, { useState, useRef } from "react";
import "./Home.css";
import useInterview from "../hooks/useInterview";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Home() {
  const { loading, generateReport, report } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const resumeInputRef = useRef(null);

  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "");
  };

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0];
    if (!jobDescription.trim()) {
      alert("Please enter a job description");
      return;
    }

    if (!resumeFile && !selfDescription.trim()) {
      alert("Upload a resume or provide a self description");
      return;
    }
    const data = await generateReport({
      jobDescription,
      selfDescription,
      resumeFile,
    });
    navigate(`/interview/${data._id}`);
  };

  const logoutUser = async () => {
    await handleLogout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="home">
      <button className="logout-btn-floating" onClick={logoutUser}>
        ⏻ Logout
      </button>

      <div className="home-header">
        <div className="home-title">Create Your Custom Interview Plan</div>

        <div className="home-subtitle">
          Let AI analyze your profile and build a personalized interview
          strategy.
        </div>
      </div>

      <div className="home-card">
        <div className="left-section">
          <div className="section-title">Target Job Description</div>

          <textarea
            className="job-input"
            placeholder="Paste the complete job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            maxLength={5000}
          />

          <div className="char-counter">{jobDescription.length} / 5000</div>
        </div>

        <div className="right-section">
          <div className="section-title">Upload Resume</div>

          <label className="file-upload-wrapper" htmlFor="resume-upload">
            <span className="file-upload-icon">📄</span>
            <span className="file-upload-text">
              {fileName ? fileName : "Click to upload your resume (PDF)"}
            </span>
            <input
              ref={resumeInputRef}
              id="resume-upload"
              type="file"
              className="file-input-hidden"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </label>

          <div className="or-text">OR</div>

          <div className="section-title">Self Description</div>

          <textarea
            className="self-input"
            placeholder="Tell us about your experience, skills, projects and career goals..."
            value={selfDescription}
            onChange={(e) => setSelfDescription(e.target.value)}
          />

          <div className="info-box">
            Uploading a resume generally produces better interview reports.
          </div>
        </div>
      </div>

      <button
        className="generate-button"
        onClick={handleGenerateReport}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Interview Plan"}
      </button>
    </div>
  );
}

export default Home;
