import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import { createI18n } from "vue-i18n";
import "./assets/index.postcss";
// import "element-plus/dist/index.css";
// import "@/assets/styles/element-plus/index.scss";
import axios from "axios";
import { esLocale } from "@/locales/es";
import { createPinia } from "pinia";
axios.defaults.baseURL = "http://localhost:4004";
const i18n = createI18n({
  locale: "es",
  messages: {
    es: esLocale,
  },
});
const head = createHead();
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(head);
app.use(i18n);
app.mount("#app");
