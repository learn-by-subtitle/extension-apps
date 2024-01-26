import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    redirect: "/intro",
    // component: () => import("./views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./views/LoginView.vue"),
  },
  {
    path: "/intro",
    name: "intro",
    component: () => import("./views/IntroView.vue"),
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
