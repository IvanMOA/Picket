import { createI18n } from "vue-i18n";
import { esLocale } from "@/config/i18n/locales/es";
export const i18n = createI18n({
  locale: "es",
  legacy: false,
  messages: {
    es: esLocale,
  },
  datetimeFormats: {
    es: {
      short: {
        year: "numeric",
        month: "short",
        day: "numeric",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "numeric",
        minute: "numeric",
      },
    },
  },
});
