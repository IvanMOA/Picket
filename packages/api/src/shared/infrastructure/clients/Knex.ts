import _knex from "knex";
import knexConfig from "../../../../knexfile";
const knexEnv =
  process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV;
export const k = _knex(knexConfig[knexEnv ?? "development"]);
