import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('board', function (table) {
    table.string('boardId', 18).primary()
    table.string('createdAt', 25).notNullable()
    table.string('ownedBy', 18).notNullable()
    table.string('title', 64).notNullable()
    table.foreign('ownedBy').references('userId').inTable('user')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('board')
}
