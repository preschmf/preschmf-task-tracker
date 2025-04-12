import { mockObject } from 'shared/src/test-helpers'
import { boardRepository, BoardRepository } from '../../data-access/board.repository'
import { DomainModels } from '../../domain-model'
import * as sessionHelpers from '../../helpers/session.helpers'
import { boardListController, createBoardListController } from './board-list.controller'

const user = {
  userId: 'dummy-userId',
} as DomainModels.User
const boards = [
  { boardId: 'board-a', title: 'Board A' },
  { boardId: 'board-b', title: 'Board B' },
] as DomainModels.Board[]

describe('createBoardListController()', () => {
  it('should retrieve the boards for the current user', async () => {
    // arrange
    const getCurrentUser = jest.fn().mockResolvedValueOnce(user)
    const boardRepository = mockObject<BoardRepository>(['findAllByUser'])
    boardRepository.findAllByUser.mockResolvedValueOnce(boards)

    // act
    const boardListController = createBoardListController(getCurrentUser, boardRepository)
    const response = await boardListController()

    // assert
    expect(response).toEqual({ boards })
    expect(getCurrentUser).toHaveBeenCalledWith()
    expect(boardRepository.findAllByUser).toHaveBeenCalledWith(user.userId)
  })
})

describe('boardListController()', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should retrieve a list of boards', async () => {
    // arrange
    const getCurrentUserSpy = jest
      .spyOn(sessionHelpers, 'getCurrentUser')
      .mockImplementationOnce(() => Promise.resolve(user))
    const findAllByUserSpy = jest
      .spyOn(boardRepository, 'findAllByUser')
      .mockImplementationOnce(() => Promise.resolve(boards))

    // act
    const response = await boardListController()

    // assert
    expect(response).toEqual({ boards })
    expect(getCurrentUserSpy).toHaveBeenCalledWith()
    expect(findAllByUserSpy).toHaveBeenCalledWith(user.userId)
  })
})
