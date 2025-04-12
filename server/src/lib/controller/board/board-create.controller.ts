import type { FastifyReply, FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { BoardViewModelAcl } from '../../anti-corruption/view-model.acl'
import boardService from '../../service/board.service'
import { getCurrentUser } from '../../helpers/session.helpers'

export const boardCreatePath = '/api/v1/board'

export const boardCreateController = async (request: FastifyRequest, reply: FastifyReply) => {
  const user = await getCurrentUser()
  const { title } = request.body as Requests.CreateBoardRequest
  const boardDomainModel = await boardService.createBoard(user.userId, title)
  const board = BoardViewModelAcl.getBoard(boardDomainModel)
  return {
    board,
  } as Responses.CreateBoardResponse
}
