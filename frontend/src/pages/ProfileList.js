import React from "react";
import { ProfileCard } from "../components/ProfileCard";

export function ProfileList({ profiles, onSelect, onRefresh }) {
  return (
    <section>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Perfiles</h2>
        <button onClick={onRefresh} style={{ padding: "8px 16px" }}>Actualizar</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} onSelect={() => onSelect(profile)} />
        ))}
      </div>
    </section>
  );
}
