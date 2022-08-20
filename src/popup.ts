import "./tailwind.css";

import { createApp } from "vue";
import rootComponent from "./module/popup/App.vue";

const app = createApp(rootComponent as any);
app.mount("#app");
