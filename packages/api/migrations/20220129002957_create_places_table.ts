import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("places", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("name");
    t.string("address");
    t.string("sections_svg_filename");
    t.string("latitude");
    t.string("longitude");
    t.json("zones_template");
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.raw(`
    alter table places enable row level security;
    create policy places_policy on places
      using ((current_setting('request.jwt.claim.role', true) = 'superadmin') OR current_setting('request.jwt.claim.role', true) = 'admin')
      with check (current_setting('request.jwt.claim.role', true) = 'superadmin');
    grant select on places to superadmin;
    grant insert on places to superadmin;
    grant update on places to superadmin;
    grant delete on places to superadmin;
    grant select on places to admin;
    `);
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("places");
}
