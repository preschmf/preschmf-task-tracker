import { DomainModels } from '../domain-model'
import type { Knex } from 'knex'
import { knex } from '../../dependencies/knex'
import { NotFoundError } from '../errors'

export class BoardRepository {
  constructor(private knex: Knex) {}

  async findAllByUser(userId: DomainModels.User['userId']): Promise<DomainModels.Board[]> {
    return await this.knex.select('*').from<DomainModels.Board>('board').where('ownedBy', userId)
  }

  async create(board: DomainModels.Board) {
    await this.knex.insert(board).into('board')
  }

  async get(boardId: DomainModels.Board['boardId']): Promise<DomainModels.Board> {
    const board = await this.knex
      .select('*')
      .from<DomainModels.Board>('board')
      .where('boardId', boardId)
      .limit(1)
      .first()
    if (!board) throw new NotFoundError('Board not found.')
    return board
  }

  async delete(boardId: DomainModels.Board['boardId']) {
    await this.knex.delete().from('task').where('boardId', boardId)
    await this.knex.delete().from('board').where('boardId', boardId)
  }
}

export const boardRepository = new BoardRepository(knex)
