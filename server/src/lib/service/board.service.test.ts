import * as idGenerators from '../data-access/id-generators'
import * as dateHelpers from '../helpers/date.helpers'
import boardService from './board.service'
import { DomainModels } from '../domain-model'
import { boardRepository } from '../data-access/board.repository'

describe('boardService', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('createBoard()', () => {
    it('should create and persist a new board', async () => {
      // arrange
      const getBoardIdSpy = jest.spyOn(idGenerators, 'getBoardId')
      const boardId = 'dummy-boardId'
      getBoardIdSpy.mockReturnValueOnce(boardId)
      const nowIsoSpy = jest.spyOn(dateHelpers, 'nowIso')
      const createdAt = '2023-01-01T00:00:00.000Z'
      nowIsoSpy.mockReturnValueOnce(createdAt)
      const boardRepositoryCreateSpy = jest.spyOn(boardRepository, 'create').mockImplementation(() => Promise.resolve())
      const userId = 'dummy-userId'
      const title = 'Fake Title'
      const expectedBoard: DomainModels.Board = {
        boardId,
        createdAt,
        ownedBy: userId,
        title,
      }

      // act
      const board = await boardService.createBoard(userId, title)

      // assert
      expect(board).toEqual(expectedBoard)
      expect(getBoardIdSpy).toHaveBeenCalledWith()
      expect(nowIsoSpy).toHaveBeenCalledWith()
      expect(boardRepositoryCreateSpy).toHaveBeenCalledWith(expectedBoard)
    })
  })
})
