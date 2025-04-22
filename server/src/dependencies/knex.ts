import createKnex from 'knex'

export const knex = createKnex({
  client: process.env.NODE_ENV === 'production' ? 'pg' : 'sqlite3',
  connection:
    process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : { filename: './task-tracker.local.sqlite3' },
  useNullAsDefault: process.env.NODE_ENV !== 'production',
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
})
