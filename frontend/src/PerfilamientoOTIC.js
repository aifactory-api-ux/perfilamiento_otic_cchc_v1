import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import { Layout } from "./components/Layout";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { ProfileList } from "./pages/ProfileList";
import { ProfileForm } from "./pages/ProfileForm";
import { api } from "./services/api";
import { auth } from "./services/auth";

function App() {
  const [view, setView] = useState("dashboard");
  const [profile, setProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth.init().then((isAuth) => {
      setAuthenticated(isAuth);
    });
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return;
    }
    api.getSkills().then(setSkills);
    api.getProfiles().then(setProfiles);
  }, [authenticated]);

  const handleSelectProfile = (selected) => {
    setProfile(selected);
    setView("edit");
  };

  const handleCreate = () => {
    setProfile(null);
    setView("create");
  };

  const handleSaved = () => {
    setView("list");
    api.getProfiles().then(setProfiles);
  };

  const handleDeleted = () => {
    setView("list");
    api.getProfiles().then(setProfiles);
  };

  if (!authenticated) {
    return <Login onLogin={() => auth.login()} />;
  }

  return (
    <Layout>
      <Navbar onNavigate={setView} onCreate={handleCreate} />
      {view === "dashboard" && <Dashboard profiles={profiles} />}
      {view === "list" && (
        <ProfileList profiles={profiles} onSelect={handleSelectProfile} onRefresh={handleSaved} />
      )}
      {view === "create" && (
        <ProfileForm skills={skills} onSaved={handleSaved} onCancel={() => setView("list")} />
      )}
      {view === "edit" && profile && (
        <ProfileForm
          profile={profile}
          skills={skills}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
          onCancel={() => setView("list")}
        />
      )}
    </Layout>
  );
}

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
