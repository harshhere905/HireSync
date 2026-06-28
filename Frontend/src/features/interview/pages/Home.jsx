import { useState, useRef, useEffect } from "react";
import "../styles/Home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import useAuth from "../../auth/hooks/useAuth.js";
import LoadingState from "../../../components/LoadingState.jsx";
import { ArrowRight, BrainCircuit, BriefcaseBusiness, FileText, Sparkles, UploadCloud, UserRound, X } from "lucide-react";

const Home = () => {
  const { loading, generateReport, reports, getReports, deleteReport } = useInterview();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { getReports(); }, []);

  const [fileName, setFileName] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [dragging, setDragging] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [generating, setGenerating] = useState(false);

  const fileRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleFile = (file) => {
    if (file && (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".docx"))) {
      setFileName(file.name);
      setResumeFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleGenerateReport = async () => {
    if (!jobTitle || !jobDescription) {
      alert("Job title and job description are required.");
      return;
    }
    if (!resumeFile && !selfDescription) {
      alert("Provide at least your resume or a self description.");
      return;
    }
    try {
      setGenerating(true);
      const data = await generateReport({ title: jobTitle, jobDescription, selfDescription, resumeFile });
      if (!data) { alert("Failed to generate report"); return; }
      navigate(`/interview/${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  const initials = user?.username ? user.username.slice(0, 2).toUpperCase() : "U";

  const handleDeleteReport = async (event, reportId) => {
    event.stopPropagation();

    const confirmed = window.confirm("Delete this report?");
    if (!confirmed) return;

    const deleted = await deleteReport(reportId);
    if (!deleted) {
      alert("Failed to delete report.");
    }
  };

  if (loading || generating) {
    return <LoadingState />;
  }

  return (
    <div className="home">
      {/* ── Navbar ── */}
      <nav className="home-nav">
        <div className="home-nav__brand">
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>
        <div className="home-nav__profile" ref={profileRef}>
          <button className="avatar-btn" onClick={() => setProfileOpen((p) => !p)} aria-label="Profile menu">
            {initials}
          </button>
          {profileOpen && (
            <div className="profile-dropdown">
              <p className="profile-dropdown__name">{user?.username || "User"}</p>
              <p className="profile-dropdown__email">{user?.email || ""}</p>
              <hr />
              <button onClick={handleLogout}>Sign out</button>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero__eyebrow">
          <Sparkles size={14} />
          AI-powered interview prep
        </div>
        <h1>Create Your Custom <span className="accent">Interview Plan</span></h1>
        <p>Turn your resume, job description, and experience into a sharp, personalized strategy in minutes.</p>

        <div className="hero__stats">
          <div className="hero__stat">
            <BrainCircuit size={16} />
            <span>Tailored questions</span>
          </div>
          <div className="hero__stat">
            <FileText size={16} />
            <span>Smart report generation</span>
          </div>
          <div className="hero__stat">
            <Sparkles size={16} />
            <span>Faster prep flow</span>
          </div>
        </div>
      </div>

      {/* ── Split Layout Card ── */}
      <div className="form-card-split">
        <div className="form-split-main">
          
          {/* Left Panel: Job Specs */}
          <div className="panel panel--left">
            <div className="panel-header">
              <div className="panel-title">
                <BriefcaseBusiness size={18} />
                <h2>Target Job Details</h2>
              </div>
              <span className="badge badge--required">Required</span>
            </div>

            <div className="field">
              <input
                type="text"
                className="input-title"
                placeholder="Job Title (e.g. Senior Frontend Engineer)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>

            <div className="field textarea-wrapper">
              <textarea
                placeholder="Paste the full job description here...&#10;e.g. 'Requires proficiency in React, TypeScript, and large-scale system design...'"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={5000}
              />
              <span className="char-counter">{jobDescription.length} / 5000 chars</span>
            </div>
          </div>

          {/* Right Panel: User Assets */}
          <div className="panel panel--right">
            <div className="panel-header">
              <div className="panel-title">
                <UserRound size={18} />
                <h2>Your Profile</h2>
              </div>
            </div>

            {/* Resume Dropzone */}
            <div className="sub-field">
              <div className="sub-label-row">
                <label>Upload Resume</label>
                <span className="badge badge--best">Best Results</span>
              </div>
              <div
                className={`file-drop ${dragging ? "dragging" : ""} ${fileName ? "has-file" : ""}`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onClick={() => fileRef.current.click()}
              >
                <input
                  type="file"
                  accept=".pdf,.docx"
                  ref={fileRef}
                  hidden
                  onChange={(e) => handleFile(e.target.files[0])}
                />
                {fileName ? (
                  <>
                    <i className="ti ti-file-check" />
                    <span className="file-name-txt">{fileName}</span>
                  </>
                ) : (
                  <>
                    <UploadCloud size={20} />
                    <span className="drop-title">Click to upload or drag & drop</span>
                    <span className="drop-subtitle">PDF or DOCX (Max 5MB)</span>
                  </>
                )}
              </div>
              {fileName && (
                <button className="remove-file-btn" onClick={(e) => { e.stopPropagation(); setFileName(null); setResumeFile(null); }}>
                  Remove file
                </button>
              )}
            </div>

            <div className="split-divider">
              <span>OR</span>
            </div>

            {/* Self Desc */}
            <div className="sub-field">
              <label>Quick Self-Description</label>
              <textarea
                className="input-self"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Info Message Box */}
            <div className="info-message">
              <i className="ti ti-info-circle" />
              <span>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</span>
            </div>
          </div>

        </div>

        {/* Card Footer Actions */}
        <div className="form-split-footer">
          <span className="footer-meta-txt">AI-Powered Strategy Generation • Approx 30s</span>
          <button className="generate-btn-split" onClick={handleGenerateReport} disabled={generating}>
            {generating ? "Generating Plan..." : "Generate My Interview Strategy"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Recent Reports ── */}
      {reports?.length > 0 && (
        <section className="recent-reports">
          <div className="recent-reports__header">
            <div>
              <h2>Recent reports</h2>
              <p>Pick up where you left off with your latest interview strategies.</p>
            </div>
          </div>
          <div className="reports-grid">
            {reports.map((report) => (
              <div key={report._id} className="report-card" onClick={() => navigate(`/interview/${report._id}`)}>
                <button
                  className="report-card__delete"
                  onClick={(event) => handleDeleteReport(event, report._id)}
                  aria-label={`Delete ${report.title}`}
                >
                  <X size={14} />
                </button>
                <div className="report-card__top">
                  <FileText size={16} />
                  <span className="match-score">{report.matchScore}% match</span>
                </div>
                <h3>{report.title}</h3>
                <div className="report-card__meta">
                  <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;