import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dependencies", (t) => {
    t.string("id").primary().notNullable();
    t.string("name").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dependencies");
}
