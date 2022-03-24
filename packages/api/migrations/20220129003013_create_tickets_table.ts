import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("tickets", (t) => {
    t.uuid("id").unique().defaultTo(knex.raw("gen_random_uuid()"));
    t.uuid("visitor_id").unsigned().references("visitors.id");
    t.uuid("zone_id").unsigned().references("zones.id");
    t.boolean("used").notNullable();
    t.timestamp("created_at", { useTz: true }).defaultTo(knex.fn.now());
    t.timestamp("updated_at", { useTz: true }).defaultTo(knex.fn.now());
  });
  await knex.raw(`
    create or replace function increment_sold_tickets()
      returns trigger
      language plpgsql
     as $$
     begin
      update zones set sold_tickets = sold_tickets + 1 where id = new.zone_id;
      return new;
     end;
     $$
  `);
  await knex.raw(`
    create or replace function decrement_sold_tickets()
      returns trigger
      language plpgsql
     as $$
     begin
      update zones set sold_tickets = sold_tickets - 1 where id = zone_id;
      return new;
     end;
     $$
  `);
  await knex.raw(`
    create trigger increment_sold_tickets_on_zones after insert on tickets for each row execute procedure increment_sold_tickets();
    create trigger decrement_sold_tickets_on_zones after insert on tickets for each row execute procedure decrement_sold_tickets();
  `);
}
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("tickets");
  knex.raw(`drop function if exists decrement_sold_tickets;`);
  knex.raw(`drop function if exists increment_sold_tickets;`);
}
