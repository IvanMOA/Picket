import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("dependencies", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.string("dependency_id").primary().notNullable();
    t.string("name").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.raw(`
    create policy dependencies_policy on dependencies
        using ((current_setting('request.jwt.claim.role', true) = 'superadmin') OR (current_setting('request.jwt.claim.dependencyId', true) = id::text) )
        with check (current_setting('request.jwt.claim.role', true) = 'superadmin');
    grant insert on dependencies to superadmin;
    grant select on dependencies to superadmin;
    grant update on dependencies to superadmin;
    grant delete on dependencies to superadmin;
    grant select on dependencies to admin;`);
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dependencies");
}
