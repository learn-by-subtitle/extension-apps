console.log("Learn by subtitle 0.0");

import { App, createApp } from "vue";
import components from "./common/components/components";

import { netflix } from "./module/netflix/initializer";
import { youtube } from "./module/youtube/initializer";
import { AppInitializer } from "./common/types/general.type";
import { cleanText } from "./common/helper/text";

let vueApp!: App;
let appInitializer!: AppInitializer;
let initialized = false;

[youtube, netflix].forEach((item) => {
  if (location.hostname.includes(item.website.host)) {
    appInitializer = item;
  }
});

setInterval(() => {
  //
  // Mount vue app of location matchs
  //
  if (!initialized && location.pathname.includes(appInitializer.website.path)) {
    initialized = true;

    vueApp = createApp(appInitializer.component as any);

    Object.keys(components).forEach((name) => {
      let component = (components as any)[name];
      vueApp.component(name, component);

      vueApp.config.globalProperties.$filters = {
        cleanText: cleanText,
      };
    });

    appInitializer.initializer(vueApp);
  }
  //
  // Unmount vue app if location dosent match anymore
  //
  else if (
    initialized &&
    !location.pathname.includes(appInitializer.website.path)
  ) {
    initialized = false;
    vueApp.unmount();
  }
}, 100);
