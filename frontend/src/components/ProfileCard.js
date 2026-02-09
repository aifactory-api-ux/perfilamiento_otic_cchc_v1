import React from "react";

export function ProfileCard({ profile, onSelect }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 12,
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        cursor: "pointer"
      }}
      onClick={onSelect}
    >
      <h3 style={{ marginTop: 0 }}>{profile.firstName} {profile.lastName}</h3>
      <p style={{ margin: "4px 0" }}>{profile.title || "Sin cargo"}</p>
      <p style={{ margin: "4px 0", color: "#555" }}>{profile.email}</p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {profile.skills && profile.skills.length ? (
          profile.skills.map((skill) => (
            <span key={skill.id} style={{ background: "#f1f5ff", padding: "2px 8px", borderRadius: 999 }}>{skill.name}</span>
          ))
        ) : (
          <span style={{ color: "#888" }}>Sin habilidades</span>
        )}
      </div>
    </div>
  );
}
