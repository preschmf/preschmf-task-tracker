import { DomainModels } from '../domain-model'
import type { Knex } from 'knex'
import { knex } from '../../dependencies/knex'

export class BoardRepository {
  constructor(private knex: Knex) {}

  async findAllByUser(userId: DomainModels.User['userId']): Promise<DomainModels.Board[]> {
    return await this.knex.select('*').from<DomainModels.Board>('board').where('ownedBy', userId)
  }

  async create(board: DomainModels.Board) {
    await this.knex.insert(board).into('board')
  }
}

export const boardRepository = new BoardRepository(knex)
