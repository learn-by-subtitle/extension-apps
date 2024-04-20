import { RouteRecordRaw, createMemoryHistory, createRouter } from "vue-router";

import WordDetailPage from "./views/WordDetail.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: "/word-detail",
  },
  {
    path: "/word-detail",
    name: "word-detail",
    component: WordDetailPage,
  },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});
