import { App } from "vue";
import { createPinia } from "pinia";
import { installVuePrime } from "./vue-prime/content-script-side";

export function addPlugins(app: App) {
  app.use(createPinia());

  installVuePrime(app);

  return app;
}
