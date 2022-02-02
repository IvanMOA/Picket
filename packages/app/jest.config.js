const {resolve} = require("path");
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  "transform": {
    "^.+\\.ts": "ts-jest",
    "^.+\\.vue$": "@vue/vue3-jest"
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
      '^@/(.*)$': resolve(__dirname, './src/$1'),
  },
  moduleFileExtensions: ['vue', 'js', 'ts'],
};