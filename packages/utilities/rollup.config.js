// rollup.config.js
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";
import { main, module, name } from "./package.json";

const isProduction = process.env.NODE_ENV === "production";

const settings = {
  globals: {
    ms: "ms",
  },
};

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: main,
        name: main,
        ...settings,
        format: "cjs",
        plugins: [isProduction && terser()],
      },
      {
        file: module,
        ...settings,
        name: name,
        format: "es",
      },
    ],
    external: ["ms"],

    plugins: [
      json(),
      resolve({
        jsnext: true,
        main: true,
      }),
      typescript({
        typescript: require("typescript"),
      }),
      commonjs({
        include: "node_modules/**",
        extensions: [".js"],
        ignoreGlobal: false,
        sourceMap: false,
      }),
    ],
  },
  {
    // path to your declaration files root
    input: "./dist/dts/index.d.ts",
    output: [
      { file: "dist/cjs/index.d.ts", format: "es" },
      { file: "dist/esm/index.d.ts", format: "es" },
    ],
    plugins: [dts()],
  },
];
