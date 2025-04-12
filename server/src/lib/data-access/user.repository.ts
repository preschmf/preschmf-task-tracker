import type { Knex } from 'knex'
import { knex } from '../../dependencies/knex'
import { DomainModels } from '../domain-model'

export class UserRepository {
  constructor(private knex: Knex) {}

  async getLocalUser(): Promise<DomainModels.User | undefined> {
    return await this.knex.select('*').from<DomainModels.User>('user').limit(1).first()
  }
}

export const userRepository = new UserRepository(knex)
