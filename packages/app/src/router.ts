import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home/Home.vue";
import About from "@/pages/About/About.vue";
import Register from "@/pages/Register/Register.vue";
import Login from "@/pages/Login/Login.vue";
import AskForVerificationCode from "@/pages/Login/AskForVerificationCode.vue";
import EventDetails from "@/pages/EventDetails/EventDetails.vue";
import VerifyCode from "@/pages/Login/VerifyCode.vue";
import Tickets from "@/pages/Tickets/Tickets.vue";
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
      path: "/events/:eventId",
      component: EventDetails,
      name: "EventDetails",
      meta: {
        authType: AuthType.PRIVATE,
      },
    },
    {
      path: "/tickets",
      component: Tickets,
      name: "Tickets",
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
      path: "/register",
      component: Register,
      meta: {
        title: "Register",
        authType: AuthType.ONLY_PUBLIC,
      },
    },
    {
      name: "Login",
      path: "/login",
      component: Login,
      children: [
        {
          name: "AskForVerificationCode",
          path: "ask-for-verification-code",
          component: AskForVerificationCode,
          meta: {
            authType: AuthType.ONLY_PUBLIC,
          },
        },
        {
          name: "VerifyCode",
          path: "verify-code",
          component: VerifyCode,
          meta: {
            authType: AuthType.ONLY_PUBLIC,
          },
        },
      ],
      meta: {
        title: "Login",
      },
    },
  ],
});
export default router;
