import createKnex from 'knex'

export const knex = createKnex({
  client: 'sqlite3',
  connection: {
    filename: './task-tracker.local.sqlite3',
  },
  useNullAsDefault: true,
})
