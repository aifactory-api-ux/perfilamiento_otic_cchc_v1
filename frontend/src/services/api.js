import { auth } from "./auth";

function getBaseUrl() {
  if (typeof window !== "undefined" && window.__ENV__ && window.__ENV__.API_URL) {
    return window.__ENV__.API_URL;
  }
  return "http://localhost:3000";
}

async function request(path, options) {
  const token = await auth.getToken();
  const response = await fetch(getBaseUrl() + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? "Bearer " + token : ""
    }
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  getProfiles() {
    return request("/profiles", { method: "GET" });
  },
  getProfile(id) {
    return request("/profiles/" + id, { method: "GET" });
  },
  createProfile(payload) {
    return request("/profiles", { method: "POST", body: JSON.stringify(payload) });
  },
  updateProfile(id, payload) {
    return request("/profiles/" + id, { method: "PUT", body: JSON.stringify(payload) });
  },
  deleteProfile(id) {
    return request("/profiles/" + id, { method: "DELETE" });
  },
  getSkills() {
    return request("/skills", { method: "GET" });
  }
};
