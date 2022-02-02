import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tickets', t => {
        t.string('id').unique().notNullable().primary()
        t.string('visitor_id').notNullable()
        t.foreign('visitor_id').references('id').inTable('visitors')
        t.date('created_at').notNullable()
        t.boolean('used').notNullable()
        t.increments('number').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tickets')
}

