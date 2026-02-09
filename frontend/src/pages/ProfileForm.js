import React, { useMemo, useState } from "react";
import { SkillSelector } from "../components/SkillSelector";
import { api } from "../services/api";

export function ProfileForm({ profile, skills, onSaved, onDeleted, onCancel }) {
  const isEdit = Boolean(profile);
  const initialSkills = useMemo(() => {
    return profile && profile.skills ? profile.skills.map((skill) => skill.id) : [];
  }, [profile]);
  const [form, setForm] = useState({
    firstName: profile ? profile.firstName : "",
    lastName: profile ? profile.lastName : "",
    email: profile ? profile.email : "",
    title: profile ? profile.title || "" : "",
    bio: profile ? profile.bio || "" : ""
  });
  const [selectedSkills, setSelectedSkills] = useState(initialSkills);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const payload = { ...form, skillIds: selectedSkills };
      if (isEdit) {
        await api.updateProfile(profile.id, payload);
      } else {
        await api.createProfile(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!isEdit) {
      return;
    }
    setSaving(true);
    try {
      await api.deleteProfile(profile.id);
      if (onDeleted) {
        onDeleted();
      }
    } catch (err) {
      setError(err.message || "Error al eliminar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 12px 32px rgba(0,0,0,0.08)" }}>
      <h2>{isEdit ? "Editar perfil" : "Crear perfil"}</h2>
      {error && <p style={{ color: "#b00020" }}>{error}</p>}
      <div style={{ display: "grid", gap: 12 }}>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Nombre" required />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Apellido" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="title" value={form.title} onChange={handleChange} placeholder="Cargo" />
        <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" rows={4} />
      </div>
      <SkillSelector skills={skills} selected={selectedSkills} onChange={setSelectedSkills} />
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button type="submit" disabled={saving} style={{ padding: "10px 18px" }}>{saving ? "Guardando" : "Guardar"}</button>
        <button type="button" onClick={onCancel} style={{ padding: "10px 18px" }}>Cancelar</button>
        {isEdit && (
          <button type="button" onClick={handleDelete} style={{ padding: "10px 18px", background: "#b00020", color: "#fff" }}>
            Eliminar
          </button>
        )}
      </div>
    </form>
  );
}
