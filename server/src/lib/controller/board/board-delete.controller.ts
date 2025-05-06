import type { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { BoardViewModelAcl } from '../../anti-corruption/view-model.acl'
import boardService from '../../service/board.service'

export const boardDeletePath = '/api/v1/board/:boardId'

export const boardDeleteController = async (request: FastifyRequest) => {
  const { boardId } = request.params as { boardId: string }

  await boardService.deleteBoard(boardId)
  return {
    success: true,
  } as Responses.DeleteBoardResponse
}
