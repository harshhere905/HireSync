import { useState, useEffect } from "react";
import "../styles/Interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";
import LoadingState from "../../../components/LoadingState.jsx";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

// ── Score Ring ────────────────────────────────────────────
const ScoreRing = ({ score }) => {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#22c55e" : score >= 60 ? "#f59e0b" : "#f43f5e";
  return (
    <svg width="110" height="110" viewBox="0 0 110 110">
      <circle cx="55" cy="55" r={r} fill="none" stroke="#1e1e22" strokeWidth="8" />
      <circle
        cx="55" cy="55" r={r} fill="none"
        stroke={color} strokeWidth="8"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 55 55)"
      />
      <text x="55" y="52" textAnchor="middle" fill="#f8fafc" fontSize="22" fontWeight="700" fontFamily="Inter, sans-serif">{score}</text>
      <text x="55" y="66" textAnchor="middle" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">%</text>
    </svg>
  );
};

// ── Question Card ─────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`question-card${open ? " open" : ""}`}>
      <button className="q-header" onClick={() => setOpen((o) => !o)}>
        <span className="q-num">Q{index + 1}</span>
        <span className="q-text">{item.question}</span>
        <span className="q-chevron">
          {open ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
          )}
        </span>
      </button>
      {open && (
        <div className="q-body">
          <div className="q-tag tag-intention">INTENTION</div>
          <p className="q-detail">{item.intention}</p>
          <div className="q-tag tag-answer">MODEL ANSWER</div>
          <p className="q-detail">{item.answer}</p>
        </div>
      )}
    </div>
  );
};

// ── Roadmap Day ───────────────────────────────────────────
const RoadMapDay = ({ day, index }) => {
  const priorities = ["high", "high", "medium", "medium", "low"];
  const priority = priorities[index] || "medium";
  return (
    <div className={`roadmap-card priority-${priority}`}>
      <div className="roadmap-week">Day {day.day}</div>
      <div className="roadmap-title">{day.focus}</div>
      <ul className="roadmap-tasks">
        {day.tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
      {day.resources?.length > 0 && (
        <div className="roadmap-resources">
          <p className="resources-label">📚 Resources</p>
          {day.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" className="resource-link">
              {`→ ${r.title}`}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
// ── Main Component ────────────────────────────────────────
const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
  }, [interviewId]);

  if (loading || !report) {
    return <LoadingState />;
  }

  const scoreColor =
    (report?.matchScore ?? 0) >= 80 ? "score--high" :
    (report?.matchScore ?? 0) >= 60 ? "score--mid" : "score--low";

  const activeQuestions =
    activeNav === "technical"
      ? report?.technicalQuestions || []
      : report?.behavioralQuestions || [];

  return (
    <div className="interview">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-label">SECTIONS</div>
        <nav>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item${activeNav === item.id ? " active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="download-btn"
          onClick={() => getResumePdf(interviewId)}
        >
          <svg height="13" style={{ marginRight: "8px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
          </svg>
          Download Resume
        </button>
      </aside>

      {/* Main Content */}
      <main className="main">
        <div className="section-header">
          <h2>
            {activeNav === "technical" && "Technical Questions"}
            {activeNav === "behavioral" && "Behavioral Questions"}
            {activeNav === "roadmap" && "Preparation Road Map"}
          </h2>
          <span className="q-count">
            {activeNav === "roadmap"
              ? `${(report?.preparationPlan || []).length}-day plan`
              : `${activeQuestions.length} questions`}
          </span>
        </div>

        {activeNav !== "roadmap" ? (
          <div className="questions-list">
            {activeQuestions.map((q, i) => (
              <QuestionCard key={i} item={q} index={i} />
            ))}
          </div>
        ) : (
          <div className="roadmap-list">
            {(report?.preparationPlan || []).map((day, i) => (
              <RoadMapDay key={day.day} day={day} index={i} />
            ))}
          </div>
        )}
      </main>

      {/* Right Panel */}
      <aside className="right-panel">
        <div className="score-section">
          <div className="panel-label">MATCH SCORE</div>
          <div className="score-ring">
            <ScoreRing score={report?.matchScore ?? 0} />
          </div>
          <p className={`score-label ${scoreColor}`}>
            {(report?.matchScore ?? 0) >= 80
              ? "Strong match for this role"
              : (report?.matchScore ?? 0) >= 60
              ? "Good match for this role"
              : "Needs improvement"}
          </p>
        </div>

        <div className="gaps-section">
          <div className="panel-label">SKILL GAPS</div>
          <div className="gaps-list">
            {(report?.skillGaps || []).map((gap, i) => (
              <div key={i} className={`gap-tag gap-${gap.severity}`}>
                {gap.skill}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Interview;