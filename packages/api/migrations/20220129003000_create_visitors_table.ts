import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('visitors', t => {
        t.string('id').unique().notNullable().primary()
        t.string('name').notNullable()
        t.string('phone_number').unique().notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('visitors')
}

