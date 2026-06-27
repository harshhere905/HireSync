const LoadingState = ({ text }) => {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#09090b",
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { opacity: 0.4; }
          50%  { opacity: 1; }
          100% { opacity: 0.4; }
        }
      `}</style>

      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        animation: "fadeUp 0.4s ease both",
      }}>

        {/* Spinner */}
        <div style={{ position: "relative", width: 56, height: 56 }}>
          {/* Track */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "2.5px solid #1c1c1e",
          }} />
          {/* Spinner */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "2.5px solid transparent",
            borderTopColor: "#f43f5e",
            borderRightColor: "rgba(244,63,94,0.3)",
            animation: "spin 0.8s linear infinite",
          }} />
          {/* Center dot */}
          <div style={{
            position: "absolute",
            inset: "50%",
            transform: "translate(-50%, -50%)",
            width: 6, height: 6,
            borderRadius: "50%",
            background: "#f43f5e",
            boxShadow: "0 0 8px rgba(244,63,94,0.6)",
          }} />
        </div>

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <p style={{
            margin: "0 0 6px",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#f4f4f5",
            letterSpacing: "-0.01em",
          }}>
            {text || "Hold on tight…"}
          </p>
          <p style={{
            margin: 0,
            fontSize: "0.78rem",
            color: "#52525b",
            animation: "shimmer 2s ease infinite",
          }}>
            Our AI is working its magic
          </p>
        </div>

      </div>
    </main>
  );
};

export default LoadingState;