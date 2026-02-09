import React from "react";
import { auth } from "../services/auth";

export function Navbar({ onNavigate, onCreate }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 24 }}>Perfilamiento OTIC</h1>
        <p style={{ margin: 0, color: "#666" }}>Gestion de perfiles y habilidades</p>
      </div>
      <nav style={{ display: "flex", gap: 12 }}>
        <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
        <button onClick={() => onNavigate("list")}>Perfiles</button>
        <button onClick={onCreate}>Nuevo</button>
        <button onClick={() => auth.logout()}>Salir</button>
      </nav>
    </header>
  );
}
