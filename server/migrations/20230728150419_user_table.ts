import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user', function (table) {
    table.string('id', 18).primary()
    table.string('userId', 128).notNullable()
    table.string('username', 128).notNullable()
    table.string('createdAt', 25).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('user')
}
