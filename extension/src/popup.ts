import "./animation.scss";
import "./tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import rootComponent from "./module/popup/App.vue";
import components from "./module/popup/components/components";
import { getAsset } from "./module/popup/helper/assets";

// Set uninstall url
chrome.runtime.setUninstallURL(process.env.UNINSTALL_FORM_URL || "");

const vueApp = createApp(rootComponent as any);
vueApp.use(createPinia());

Object.keys(components).forEach((name) => {
  let component = (components as any)[name];
  vueApp.component(name, component);
});

vueApp.config.globalProperties = {
  ...vueApp.config.globalProperties,
  $getAsset: getAsset,
};

vueApp.mount("#app");
