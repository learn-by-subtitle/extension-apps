import { App } from "vue";
import { createPinia } from "pinia";
import { installVuePrime } from "./vue-prime";

export function addPlugins(app: App) {
  app.use(createPinia());

  installVuePrime(app);

  return app;
}
