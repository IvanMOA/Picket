import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dependencies", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("name").notNullable();
    t.timestamp("created_at", { useTz: true }).notNullable();
    t.timestamp("updated_at", { useTz: true }).notNullable();
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dependencies");
}
