import "./tailwind.css";

import { createApp } from "vue";
import rootComponent from "./module/popup/App.vue";
import components from "./module/popup/components/components";

const vueApp = createApp(rootComponent as any);

Object.keys(components).forEach((name) => {
  let component = (components as any)[name];
  vueApp.component(name, component);
});

vueApp.mount("#app");
