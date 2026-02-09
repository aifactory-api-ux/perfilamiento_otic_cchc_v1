import React from "react";

export function Dashboard({ profiles }) {
  const total = profiles.length;
  return (
    <section style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
      <h2 style={{ marginTop: 0 }}>Resumen</h2>
      <p>Perfiles registrados: {total}</p>
      <p>Revise la lista completa o cree un nuevo perfil.</p>
    </section>
  );
}
