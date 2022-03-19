import { createI18n } from "vue-i18n";
import { esLocale } from "@/config/i18n/locales/es";
export const i18n = createI18n({
  locale: "es",
  legacy: false,
  messages: {
    es: esLocale,
  },
});
