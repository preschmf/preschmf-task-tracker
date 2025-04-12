import type { Knex } from 'knex'
import { MockedObject, mockObject } from 'shared/src/test-helpers'
import { getKnexMock } from '../../../test-mocks/knex'
import { DomainModels } from '../domain-model'
import { UserRepository } from './user.repository'

describe('UserRepository', () => {
  let knex: MockedObject<Knex>
  let userRepository: UserRepository
  beforeEach(() => {
    knex = getKnexMock()
    userRepository = new UserRepository(knex)
  })

  describe('getLocalUser()', () => {
    it('returns a user', async () => {
      // arrange
      const expectedUser = { userId: 'fake-userId' } as DomainModels.User
      knex.first.mockResolvedValueOnce(expectedUser)

      // act
      const localUser = await userRepository.getLocalUser()

      // assert
      expect(localUser).toEqual(expectedUser)
      expect(knex.select).toHaveBeenCalledWith('*')
      expect(knex.from).toHaveBeenCalledWith('user')
      expect(knex.limit).toHaveBeenCalledWith(1)
      expect(knex.first).toHaveBeenCalledWith()
    })
  })
})
