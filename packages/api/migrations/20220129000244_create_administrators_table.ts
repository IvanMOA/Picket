import { Knex } from "knex";
import { roles } from "../src/modules/users/domain/Role";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("administrators", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("dependency_id").references("dependencies.id");
    t.string("email").unique().notNullable();
    t.string("name").notNullable();
    t.enum("role", roles).notNullable();
  });
  await knex.raw(`
    create policy administrators_policy on administrators
      using ( (current_setting('request.jwt.claim.dependencyId', true) = dependency_id::text) OR (current_setting('request.jwt.claim.role', true) = 'superadmin') );
    grant select on administrators to superadmin;`);
}
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("administrators");
}
