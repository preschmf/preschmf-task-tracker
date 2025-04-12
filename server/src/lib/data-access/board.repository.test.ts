import type { Knex } from 'knex'
import { MockedObject, mockObject } from 'shared/src/test-helpers'
import { getKnexMock } from '../../../test-mocks/knex'
import { DomainModels } from '../domain-model'
import { BoardRepository } from './board.repository'

describe('BoardRepository', () => {
  let knex: MockedObject<Knex>
  let boardRepository: BoardRepository
  beforeEach(() => {
    knex = getKnexMock()
    boardRepository = new BoardRepository(knex)
  })

  describe('findAllByUser()', () => {
    it('should retrieve all boards associated with the user', async () => {
      // arrange
      const expectedBoards = [{ boardId: 'board-a' }, { boardId: 'board-b' }] as DomainModels.Board[]
      knex.where.mockResolvedValueOnce(expectedBoards)
      const userId = 'fake-userId'

      // act
      const boards = await boardRepository.findAllByUser(userId)

      // assert
      expect(boards).toEqual(expectedBoards)
      expect(knex.select).toHaveBeenCalledWith('*')
      expect(knex.from).toHaveBeenCalledWith('board')
      expect(knex.where).toHaveBeenCalledWith('ownedBy', userId)
    })
  })

  describe('create()', () => {
    it('should insert a board into the table', async () => {
      // arrange
      const board = {
        boardId: 'dummy-boardId',
      } as DomainModels.Board

      // act
      await boardRepository.create(board)

      // assert
      expect(knex.insert).toHaveBeenCalledWith(board)
      expect(knex.into).toHaveBeenCalledWith('board')
    })
  })
})
