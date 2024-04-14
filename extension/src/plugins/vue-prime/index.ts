import { App } from "vue";

import PrimeVue from "primevue/config";

import "primevue/resources/themes/lara-light-pink/theme.css";

export const installVuePrime = (app: App) => {
  app.use(PrimeVue);

  return app;
};
