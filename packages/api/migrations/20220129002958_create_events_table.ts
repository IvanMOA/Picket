import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("events", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("place_id").unsigned().references("places.id").onDelete("CASCADE");
    t.uuid("dependency_id")
      .unsigned()
      .references("dependencies.id")
      .onDelete("CASCADE");
    t.string("name");
    t.string("sections_svg_filename").notNullable();
    t.integer("tickets_per_person");
    t.string("description");
    t.timestamp("starts_at");
    t.timestamp("available_since");
    t.timestamp("available_until");
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.raw(`
    alter table events enable row level security;
    create policy events_policy on events
      using (true)
      with check (current_setting('request.jwt.claim.dependencyId', true) = dependency_id::text);
    grant select on events to superadmin;
    grant select on events to visitor;
    grant select on events to admin;
    grant insert on events to admin;
    grant update on events to admin;
    grant delete on events to admin;
    `);
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("events");
}
