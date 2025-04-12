import { Knex } from 'knex'
import { getBoardId, getUserId } from '../src/lib/data-access/id-generators'
import { DomainModels } from '../src/lib/domain-model'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user').del()

  // Inserts seed entries
  const user: DomainModels.User = {
    userId: getUserId(),
    name: 'Local User',
  }
  await knex('user').insert([user])

  // Deletes ALL existing entries
  await knex('board').del()

  // Inserts seed entries
  const inbox: DomainModels.Board = {
    boardId: getBoardId(),
    createdAt: new Date().toISOString(),
    ownedBy: user.userId,
    title: 'Inbox',
  }
  const nextActions: DomainModels.Board = {
    boardId: getBoardId(),
    createdAt: new Date().toISOString(),
    ownedBy: user.userId,
    title: 'Next Actions',
  }
  await knex('board').insert([inbox, nextActions])
}
