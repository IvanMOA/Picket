import { buildSchema } from "graphql";
import * as path from "path";
import * as fs from "fs";
export const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, "schema.graphqls")).toString()
);
