import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "otic",
  clientId: "perfilamiento-frontend"
});

let isReady = false;

async function init() {
  if (isReady) {
    return keycloak.authenticated;
  }
  const authenticated = await keycloak.init({
    onLoad: "check-sso",
    silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html"
  });
  isReady = true;
  return authenticated;
}

async function login() {
  await keycloak.login();
}

async function logout() {
  await keycloak.logout();
}

async function getToken() {
  if (!isReady) {
    return "";
  }
  if (keycloak.isTokenExpired()) {
    await keycloak.updateToken(30);
  }
  return keycloak.token || "";
}

export const auth = {
  init,
  login,
  logout,
  getToken,
  get profile() {
    return keycloak.tokenParsed || null;
  }
};
