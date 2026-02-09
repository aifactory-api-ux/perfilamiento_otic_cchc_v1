import { registerApplication, start } from "single-spa";

registerApplication({
  name: "perfilamiento-otic",
  app: () => import("./PerfilamientoOTIC"),
  activeWhen: ["/"]
});

start();
