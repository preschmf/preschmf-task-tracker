import type { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { BoardViewModelAcl } from '../../anti-corruption/view-model.acl'
import boardService from '../../service/board.service'

export const boardCreatePath = '/api/v1/board'

export const boardCreateController = async (request: FastifyRequest) => {
  const { title } = request.body as Requests.CreateBoardRequest
  if (!request.user) {
    throw new Error('User is not authenticated')
  }
  const { userId } = request.user
  const boardDomainModel = await boardService.createBoard(userId, title)
  const board = BoardViewModelAcl.getBoard(boardDomainModel)
  return {
    board,
  } as Responses.CreateBoardResponse
}
