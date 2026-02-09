import React from "react";

export function Login({ onLogin }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <h1 style={{ fontSize: 32, marginBottom: 8 }}>Perfilamiento OTIC</h1>
      <p style={{ maxWidth: 420, textAlign: "center" }}>
        Inicie sesion con su cuenta para administrar perfiles y habilidades.
      </p>
      <button
        onClick={onLogin}
        style={{ padding: "12px 24px", borderRadius: 8, border: "none", background: "#222", color: "#fff", cursor: "pointer" }}
      >
        Iniciar sesion
      </button>
    </div>
  );
}
