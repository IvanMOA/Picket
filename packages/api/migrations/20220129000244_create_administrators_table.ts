import { Knex } from "knex";
import { roles } from "../src/modules/users/domain/Role";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("administrators", (t) => {
    t.string("id").unique().notNullable().primary();
    t.string("email").unique().notNullable();
    t.string("name").notNullable();
    t.enum("role", roles).notNullable();
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("administrators");
}
