import type { Knex } from 'knex'

// Update with your config settings.

// npx knex migrate:make user_table -x ts

// npx knex seed:make default_user_and_boards -x ts

export const config: { [key: string]: Knex.Config } = {
  local: {
    client: 'sqlite3',
    connection: {
      filename: './task-tracker.local.sqlite3',
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
}

module.exports = config
