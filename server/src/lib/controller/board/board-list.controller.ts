import { Responses } from 'shared/src/http'
import { BoardViewModelAcl } from '../../anti-corruption/view-model.acl'
import { getCurrentUser, GetCurrentUserFn } from '../../helpers/session.helpers'
import { boardRepository, BoardRepository } from '../../data-access/board.repository'

export const boardListPath = '/api/v1/board'

/**
 * @deprecated Do not use. This only exists to test our a pattern. Use `boardListController` instead.
 */
export const createBoardListController = (getCurrentUser: GetCurrentUserFn, boardRepository: BoardRepository) => {
  return async () => {
    const user = await getCurrentUser()
    const boards = await boardRepository.findAllByUser(user.userId)
    return {
      boards: BoardViewModelAcl.getBoardList(boards),
    } as Responses.BoardListResponse
  }
}

export const boardListController = async () => {
  const user = await getCurrentUser()
  const boards = await boardRepository.findAllByUser(user.userId)
  return {
    boards: BoardViewModelAcl.getBoardList(boards),
  } as Responses.BoardListResponse
}
