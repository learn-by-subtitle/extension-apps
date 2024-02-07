log("Using version", VERSION);

import "./animation.scss";
import "./tailwind.css";

import { App, createApp } from "vue";
import components from "./module/subtitle/components/components";

import { netflix } from "./module/subtitle/web_netflix/initializer";
import { youtube } from "./module/subtitle/web_youtube/initializer";
import { AppInitializer } from "./common/types/general.type";
import { cleanText } from "./common/helper/text";
import { analytic } from "./plugins/mixpanel";
import { VERSION } from "./common/static/global";
import { log } from "./common/helper/log";
import { addPlugins } from "./plugins/install";
import {
  registerGlobalEvents,
  unregisterGlobalEvents,
} from "./module/subtitle/helpers/global-events";
import { loginWithLastSession } from "./plugins/modular-rest";

let vueApp!: App;
let appInitializer!: AppInitializer;
let initialized = false;

// Select an app initializer from existing modules
//
[youtube, netflix].forEach((item) => {
  if (location.hostname.includes(item.website.host)) {
    appInitializer = item;
  }
});

// Create an interval to initializing the app
// In each interval cycle Initializer seeks for a subtitle container,
// Then the app being initiated if container exists
//
function start() {
  setInterval(() => {
    //
    // Mount vue app of location matchs
    //
    if (
      !initialized &&
      location.pathname.includes(appInitializer.website.path)
    ) {
      initialized = true;

      // Create a vue app and add plugins
      vueApp = addPlugins(createApp(appInitializer.component as any));

      // Login with last session
      loginWithLastSession();

      // Register components
      Object.keys(components).forEach((name) => {
        let component = (components as any)[name];
        vueApp.component(name, component);

        vueApp.config.globalProperties.$filters = {
          cleanText: cleanText,
        };
      });

      appInitializer
        .start(vueApp)
        .then((_) => {
          analytic.track("Used In");
          registerGlobalEvents();
        })
        .catch((_) => analytic.track("Error on initiating"));
    }

    //
    // Unmount vue app if location dosent match anymore
    //
    else if (
      initialized &&
      !location.pathname.includes(appInitializer.website.path)
    ) {
      initialized = false;
      unregisterGlobalEvents();
      vueApp.unmount();
    }
  }, 100);
}

start();
