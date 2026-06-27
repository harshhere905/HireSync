import { useNavigate } from "react-router";
import "../styles/Policy.scss";

const Policy = () => {
  const navigate = useNavigate();

  return (
    <div className="policy">
      <header className="policy__header">
        <div className="policy__logo" onClick={() => navigate("/")}>
          <div className="logo-dot" />
          <span>HireSync</span>
        </div>
        <button className="policy__back" onClick={() => navigate("/")}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Home
        </button>
      </header>

      <main className="policy__content">
        <p className="eyebrow">LEGAL</p>
        <h1>Privacy Policy</h1>
        <p className="policy__updated">Last updated: June 2026</p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            When you use HireSync, we collect the information you provide directly —
            your resume content (uploaded as PDF/DOCX or typed as a self-description),
            job descriptions you paste in, and basic account details such as your name
            and email address.
          </p>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your resume and job description data solely to generate your
            personalized interview plan — including tailored questions, match score,
            skill gap analysis, and prep roadmap. We do not sell your personal data to
            third parties.
          </p>
        </section>

        <section>
          <h2>3. AI Processing & Third-Party Services</h2>
          <p>
            Your resume and job description text is processed by Google's Gemini AI to
            generate your report. This data is sent securely and is not used by us to
            train any models beyond what's needed to produce your results.
          </p>
        </section>

        <section>
          <h2>4. Data Storage & Retention</h2>
          <p>
            Your uploaded resumes, generated reports, and account information are
            stored securely and retained only for as long as your account remains
            active, or as required by law.
          </p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            We use essential cookies to keep you logged in and remember your
            preferences. We do not use third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2>6. Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal
            data at any time by contacting us using the details below.
          </p>
        </section>

        <section>
          <h2>7. Contact Us</h2>
          <p>
            For any privacy-related questions, reach out to us at{" "}
            <a href="mailto:support.hiresync@gmail.com">support.hiresync@gmail.com</a>.
          </p>
        </section>
      </main>

      <footer className="policy__footer">
        <span>© 2026 HireSync. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Policy;