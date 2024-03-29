import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import Administrators from "@/pages/Administrators/Administrators.vue";
import About from "@/pages/About/About.vue";
import Login from "@/pages/Login/Login.vue";
import Dependencies from "@/pages/Dependencies/Dependencies.vue";
import Events from "@/pages/Events/Events.vue";
import Places from "@/pages/Places/Places.vue";
import Zones from "@/pages/Zones/Zones.vue";
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
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/users",
      component: Administrators,
      name: "Administrators",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/dependencies",
      component: Dependencies,
      name: "Dependencies",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/places",
      component: Places,
      name: "Places",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/events",
      component: Events,
      name: "Events",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/events/:eventId/zones",
      component: Zones,
      name: "Zones",
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
        authType: AuthType.ONLY_PUBLIC,
      },
    },
  ],
});
export default router;
