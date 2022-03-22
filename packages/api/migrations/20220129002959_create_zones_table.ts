import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("zones", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("place_id").unsigned().references("places.id").onDelete("CASCADE");
    t.uuid("event_id")
      .unsigned()
      .references("events.id")
      .nullable()
      .onDelete("CASCADE");
    t.string("name");
    t.boolean("active");
    t.integer("capacity");
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.raw(`
    alter table zones enable row level security;
    create policy events_policy on zones
      using (true)
      with check ((select dependency_id from events where id = event_id)::text = current_setting('request.jwt.claim.dependencyId', true));
    grant select on zones to superadmin;
    grant select on zones to admin;
    grant insert on zones to admin;
    grant update on zones to admin;
    grant delete on zones to admin;
    `);
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("zones");
}
