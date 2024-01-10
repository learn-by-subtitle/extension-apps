import { App } from "vue";
import { createPinia } from "pinia";

export function addPlugins(app: App) {
  app.use(createPinia());

  return app;
}
