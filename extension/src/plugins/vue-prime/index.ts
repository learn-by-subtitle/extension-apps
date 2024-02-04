import { App } from "vue";

import PrimeVue from "primevue/config";
// import Lara from "./lara";

import "primevue/resources/themes/lara-dark-green/theme.css";

export const installVuePrime = (app: App) => {
  app.use(
    PrimeVue
    //   {
    //   unstyled: true,
    //   pt: Lara,
    // }
  );

  return app;
};
