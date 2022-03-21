import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tickets", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("visitor_id").unsigned().references("visitors.id");
    t.uuid("event_id").unsigned().references("events.id");
    t.date("created_at").notNullable();
    t.boolean("used").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tickets");
}
