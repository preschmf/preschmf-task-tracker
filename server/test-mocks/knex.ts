import type { Knex } from 'knex'
import { MockedObject, mockObject } from 'shared/src/test-helpers'

export const getKnexMock = () => {
  const knex: MockedObject<Knex> = mockObject([
    'select',
    'from',
    'limit',
    'first',
    'where',
    'insert',
    'into',
    'table',
    'update',
  ])
  knex.select.mockReturnThis()
  knex.from.mockReturnThis()
  knex.limit.mockReturnThis()
  knex.first.mockReturnThis()
  knex.where.mockReturnThis()
  knex.insert.mockReturnThis()
  knex.into.mockReturnThis()
  knex.table.mockReturnThis()
  knex.update.mockReturnThis()
  return knex
}
