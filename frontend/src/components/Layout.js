import React from "react";

export function Layout({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f3f7ff 0%, #fdf6ec 100%)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>
        {children}
      </div>
    </div>
  );
}
