import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Help.scss";

const faqs = [
  {
    q: "How does HireSync generate my interview plan?",
    a: "Upload your resume (or write a self-description) and paste a job description. Our AI analyzes both and generates tailored questions, a match score, skill gaps, and a prep roadmap in under 30 seconds.",
  },
  {
    q: "Do I need to upload a resume, or can I just describe myself?",
    a: "Either works. You can upload a PDF/DOCX resume, or skip that and write a short self-description instead — the AI extracts your skills from whichever you provide.",
  },
  {
    q: "What AI model powers HireSync?",
    a: "Reports are generated using Google's Gemini AI, which analyzes your profile and the job description to produce tailored results.",
  },
  {
    q: "Can I download my resume after generating a report?",
    a: "Yes — once your report is generated, you can download an ATS-optimized, role-tailored resume PDF in one click.",
  },
  {
    q: "Is my resume data stored or shared?",
    a: "Your data is used only to generate your report and is not sold to third parties. See our Privacy Policy for full details.",
  },
  {
    q: "Is HireSync free to use?",
    a: "Yes, getting started and generating your first interview plan is free — no sign-up friction required.",
  },
];

const Help = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="help">
      <header className="help__header">
        <div className="help__logo" onClick={() => navigate("/")}>
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>
        <button className="help__back" onClick={() => navigate("/")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Home
        </button>
      </header>

      <main className="help__content">
        <p className="eyebrow">SUPPORT</p>
        <h1>Help Center</h1>
        <p className="help__sub">Find answers to common questions about HireSync.</p>

        <div className="help__faqs">
          {faqs.map((item, i) => (
            <div className={`help__faq ${openIndex === i ? "is-open" : ""}`} key={item.q}>
              <button className="help__faq-question" onClick={() => toggle(i)}>
                {item.q}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {openIndex === i && <p className="help__faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>

        <div className="help__contact">
          <h2>Still need help?</h2>
          <p>
            Reach out to our support team at{" "}
            <a href="mailto:support.hiresync@gmail.com">support.hiresync@gmail.com</a> and we'll
            get back to you within 24 hours.
          </p>
        </div>
      </main>

      <footer className="help__footer">
        <span>© 2026 HireSync. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Help;