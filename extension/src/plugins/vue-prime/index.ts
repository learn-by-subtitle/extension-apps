import { App } from "vue";

import PrimeVue from "primevue/config";
import Lara from "./lara";

export const installVuePrime = (app: App) => {
  app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
  });

  return app;
};
