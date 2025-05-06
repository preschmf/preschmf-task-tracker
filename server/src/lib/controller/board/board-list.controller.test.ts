import { mockObject } from 'shared/src/test-helpers'
import { boardRepository, BoardRepository } from '../../data-access/board.repository'
import { DomainModels } from '../../domain-model'
import { boardListController } from './board-list.controller'
import { FastifyRequest } from 'fastify'

const user = {
  userId: 'dummy-userId',
  id: 'dummy-id',
  username: 'dummy-username',
  createdAt: new Date().toISOString(),
} as DomainModels.User
const boards = [
  { boardId: 'board-a', title: 'Board A' },
  { boardId: 'board-b', title: 'Board B' },
] as DomainModels.Board[]

describe('boardListController()', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should retrieve a list of boards', async () => {
    // arrange
    const getCurrentUserSpy = jest
    const findAllByUserSpy = jest.spyOn(boardRepository, 'findAllByUser')
    // act
    const request = {
      user,
    } as unknown as FastifyRequest
    const response = await boardListController(request)

    // assert
    expect(response).toEqual({ boards })
    expect(getCurrentUserSpy).toHaveBeenCalledWith()
    expect(findAllByUserSpy).toHaveBeenCalledWith(user.userId)
  })
})
