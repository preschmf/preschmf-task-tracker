import type { Knex } from 'knex'
import { knex } from '../../dependencies/knex'
import { DomainModels } from '../domain-model'

export class UserRepository {
  constructor(private knex: Knex) {}

  async create(user: DomainModels.User) {
    await this.knex.insert(user).into('user')
  }
  async findByUserId(userId: DomainModels.User['userId']) {
    return await this.knex.select('*').from<DomainModels.User>('user').where('userId', userId).first()
  }
  async findById(id: DomainModels.User['id']) {
    return await this.knex.select('*').from<DomainModels.User>('user').where('id', id).first()
  }
  async update(userId: DomainModels.User['userId'], user: Partial<DomainModels.User>) {
    await this.knex('user').where('userId', userId).update(user)
  }
  async delete(userId: DomainModels.User['userId']) {
    await this.knex('user').where('userId', userId).del()
  }
}

export const userRepository = new UserRepository(knex)
