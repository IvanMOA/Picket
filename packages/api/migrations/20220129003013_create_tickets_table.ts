import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("tickets", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("visitor_id").unsigned().references("visitors.id");
    t.string("event_id").unsigned().references("events.id");
    t.date("created_at").notNullable();
    t.boolean("used").notNullable();
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("tickets");
}
