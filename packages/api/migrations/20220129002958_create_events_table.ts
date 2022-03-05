import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("events", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("place_id").unsigned().references("places.id").onDelete("CASCADE");
    t.string("name");
    t.integer("tickets_per_person");
    t.string("description");
    t.timestamp("starts_at");
    t.timestamp("created_at", { useTz: true });
    t.timestamp("updated_at", { useTz: true });
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("events");
}
