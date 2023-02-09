/// <reference types="vitest" />
import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";
import pkg from "./package.json";
import ElementPlus from "unplugin-element-plus/vite";
import vueJsx from '@vitejs/plugin-vue-jsx'
process.env.VITE_APP_VERSION = pkg.version;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}
export default defineConfig({
  publicDir: "./src/assets",
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: "./setup.ts",
    deps: {
      // see https://github.com/vitest-dev/vitest/issues/1388
      inline: ['element-plus']
    }
  },
  plugins: [
    vue({
      script: {
        refSugar: true
      }
    }),
    /**
     * We don't really want to use JSX to write our components, but it will be
     * useful when writing tests
     */
    vueJsx(),
    ElementPlus({
      useSource: true
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/element-plus/index.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
