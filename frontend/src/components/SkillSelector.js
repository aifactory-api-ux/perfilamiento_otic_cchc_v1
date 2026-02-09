import React from "react";

export function SkillSelector({ skills, selected, onChange }) {
  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((skillId) => skillId !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div style={{ marginTop: 16 }}>
      <h4>Habilidades</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
        {skills.map((skill) => (
          <label key={skill.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={selected.includes(skill.id)}
              onChange={() => toggle(skill.id)}
            />
            {skill.name}
          </label>
        ))}
      </div>
    </div>
  );
}
