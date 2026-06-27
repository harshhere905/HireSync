import { useNavigate } from "react-router";
import "../styles/Landing.scss";

const Landing = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">

      {/* ── Navbar ── */}
      <nav className="l-nav">
        <div className="l-nav__logo">
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>
        <div className="l-nav__links">
          <button onClick={() => scrollTo("how-it-works")}>How it works</button>
          <button onClick={() => scrollTo("features")}>Features</button>
          <button onClick={() => scrollTo("stats")}>Stats</button>
        </div>
        <button className="btn-primary btn--sm" onClick={() => navigate("/login")}>
          Get Started
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </nav>

      {/* ── Hero ── */}
      <section className="l-hero">
        <div className="l-hero__badge">
          <span className="badge-dot" />
          AI-Powered Interview Prep
        </div>
        <h1 className="l-hero__title">
          Ace Your Next<br />
          <span className="accent">Interview</span> With Confidence
        </h1>
        <p className="l-hero__sub">
          Upload your resume, paste the job description, and get a personalized
          interview plan — tailored questions, skill gap analysis, and a prep
          roadmap in 30 seconds.
        </p>
        <div className="l-hero__cta">
          <button className="btn-primary btn--lg" onClick={() => navigate("/login")}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Get Started — It's Free
          </button>
          <button className="btn-ghost" onClick={() => scrollTo("how-it-works")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
            See how it works
          </button>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="l-section" id="how-it-works">
        <div className="l-section__inner">
          <p className="eyebrow">HOW IT WORKS</p>
          <h2>From resume to ready — in 3 steps</h2>
          <div className="l-howitworks">

            <div className="l-hiw-step">
              <div className="l-hiw-step__num">01</div>
              <div className="l-hiw-step__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
              </div>
              <h3>Upload Resume <span className="or-tag">or</span> Self Description</h3>
              <p>Upload your resume as PDF or DOCX, or write a short self-description. Either works — our AI extracts your skills automatically.</p>
              <ul className="l-hiw-step__points">
                <li>PDF or DOCX upload supported</li>
                <li>Or type a quick self-description</li>
                <li>AI extracts skills either way</li>
              </ul>
            </div>

            <div className="l-hiw-connector">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>

            <div className="l-hiw-step">
              <div className="l-hiw-step__num">02</div>
              <div className="l-hiw-step__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              </div>
              <h3>Paste Job Description</h3>
              <p>Add the job title and full job description. Our AI analyzes requirements and maps them to your profile.</p>
              <ul className="l-hiw-step__points">
                <li>Any role, any company</li>
                <li>Requirement extraction</li>
                <li>Profile gap analysis</li>
              </ul>
            </div>

            <div className="l-hiw-connector">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>

            <div className="l-hiw-step">
              <div className="l-hiw-step__num">03</div>
              <div className="l-hiw-step__icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3>Get Your Interview Plan</h3>
              <p>In under 30 seconds, receive your complete interview plan — questions, skill gaps, match score, and roadmap.</p>
              <ul className="l-hiw-step__points">
                <li>Technical & behavioral Qs</li>
                <li>Match score + skill gaps</li>
                <li>Day-by-day prep roadmap</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="l-section" id="features">
        <div className="l-section__inner">
          <p className="eyebrow">FEATURES</p>
          <h2>Everything you need to prepare</h2>
          <div className="l-grid-3">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
                title: "Smart Question Generation",
                desc: "AI generates role-specific technical and behavioral questions based on your resume and job description.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
                title: "Match Score & Skill Gaps",
                desc: "See exactly how well your profile matches the role and which skills to focus on before the interview.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
                title: "Personalized Prep Roadmap",
                desc: "Get a day-by-day preparation plan with specific tasks and timelines to close your skill gaps fast.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
                title: "AI-Tailored to You",
                desc: "Every plan is unique — generated from your actual resume and the specific job, not generic templates.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
                title: "Resume PDF Download",
                desc: "Download an ATS-optimized, role-tailored resume PDF generated from your profile in one click.",
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                title: "Ready in 30 Seconds",
                desc: "No waiting, no sign-up friction. Get your full interview plan generated by Gemini AI in under 30 seconds.",
              },
            ].map((f) => (
              <div className="l-card" key={f.title}>
                <div className="l-card__icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="l-section" id="stats">
        <div className="l-section__inner">
          <p className="eyebrow">BY THE NUMBERS</p>
          <h2>Trusted by candidates worldwide</h2>
          <div className="l-grid-4">
            {[
              { num: "10k+", label: "Reports generated" },
              { num: "88%",  label: "Average match score" },
              { num: "30s",  label: "Generation time" },
              { num: "4.9★", label: "User satisfaction" },
            ].map((s) => (
              <div className="l-stat" key={s.num}>
                <div className="l-stat__num">{s.num}</div>
                <div className="l-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="l-cta-banner">
        <h2>Ready to land your dream job?</h2>
        <p>Join thousands of candidates who used HireSync to prepare smarter.</p>
        <button className="btn-primary btn--lg" onClick={() => navigate("/login")}>
          Start for Free
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="l-footer">
        <div className="l-nav__logo">
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>
        <div className="l-footer__links">
          <button className="l-footer__link" onClick={() => navigate("/privacy-policy")}>
            Privacy Policy
          </button>
          <button className="l-footer__link" onClick={() => navigate("/terms-of-service")}>
            Terms of Service
          </button>
          <button className="l-footer__link" onClick={() => navigate("/help-center")}>
            Help Center
          </button>
        </div>
        <span className="l-footer__copy">© 2025 HireSync. All rights reserved.</span>
      </footer>

    </div>
  );
};

export default Landing;