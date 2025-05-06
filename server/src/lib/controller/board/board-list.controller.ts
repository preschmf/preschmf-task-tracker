import type { FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { BoardViewModelAcl } from '../../anti-corruption/view-model.acl'
import { boardRepository } from '../../data-access/board.repository'

export const boardListPath = '/api/v1/board'

export const boardListController = async (request: FastifyRequest) => {
  if (!request.user) {
    throw new Error('User is not authenticated')
  }
  const { userId } = request.user
  const boards = await boardRepository.findAllByUser(userId)
  return {
    boards: BoardViewModelAcl.getBoardList(boards),
  } as Responses.BoardListResponse
}
