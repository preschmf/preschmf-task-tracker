import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('task', function (table) {
    table.string('taskId', 128).primary()
    table.string('boardId', 128).notNullable()
    table.string('title', 64).notNullable()
    table.string('createdAt', 25).notNullable()
    table.string('scheduledDate', 10).nullable() // ex: 2022-01-30
    table.string('status', 24).notNullable()
    table.foreign('boardId').references('boardId').inTable('board')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('task')
}
