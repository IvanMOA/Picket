import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import ElementPlus from "unplugin-element-plus/vite";
process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}
export default defineConfig({
  plugins: [
    vue({
      script: {
        refSugar: true,
      },
    }),
    ElementPlus({
      useSource: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-plus/index.scss" as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
