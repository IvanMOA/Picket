import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("places", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("name");
    t.string("address");
    t.string("map_image_url");
    t.string("latitude");
    t.string("longitude");
    t.timestamp("created_at", { useTz: true });
    t.timestamp("updated_at", { useTz: true });
  });
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("places");
}
