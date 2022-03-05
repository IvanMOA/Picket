import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import About from "@/pages/About/About.vue";
import Login from "@/pages/Login/Login.vue";
export enum AuthType {
  "PUBLIC" = "PUBLIC",
  "PRIVATE" = "PRIVATE",
  "ONLY_PUBLIC" = "ONLY_PUBLIC",
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/about",
      component: About,
      name: "About",
      meta: {
        authType: AuthType.PUBLIC,
      },
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
  ],
});
export default router;
