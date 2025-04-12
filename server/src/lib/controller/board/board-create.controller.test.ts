import { FastifyReply, FastifyRequest } from 'fastify'
import { Requests } from 'shared/src/http'
import { DomainModels } from '../../domain-model'
import * as sessionHelpers from '../../helpers/session.helpers'
import boardService from '../../service/board.service'
import { boardCreateController } from './board-create.controller'

describe('boardCreateController()', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a board', async () => {
    // arrange
    const title = 'Fake Title'
    const request = {
      body: {
        title,
      } as Requests.CreateBoardRequest,
    } as FastifyRequest
    const reply = {} as FastifyReply
    const getCurrentUserSpy = jest.spyOn(sessionHelpers, 'getCurrentUser')
    const user = {} as DomainModels.User
    getCurrentUserSpy.mockImplementationOnce(() => Promise.resolve(user))
    const createBoardSpy = jest.spyOn(boardService, 'createBoard')
    const boardDomainModel = {
      boardId: 'dummy-boardId',
      title: 'dummy-title',
    } as DomainModels.Board
    createBoardSpy.mockImplementationOnce(() => Promise.resolve(boardDomainModel))

    // act
    const response = await boardCreateController(request, reply)

    // assert
    expect(response).toEqual({
      board: boardDomainModel,
    })
    expect(getCurrentUserSpy).toHaveBeenCalledWith()
    expect(createBoardSpy).toHaveBeenCalledWith(user.userId, title)
  })
})
