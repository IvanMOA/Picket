import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('events', t => {
        t.string('id').unique().notNullable().primary()
        t.string('name').notNullable()
        t.string('description').notNullable()
        t.date('starts_at').notNullable()
        t.string('duration').notNullable()
        t.integer('tickets_left').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('events')
}

