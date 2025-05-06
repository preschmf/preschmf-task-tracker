import { boardRepository } from '../data-access/board.repository'
import { getBoardId } from '../data-access/id-generators'
import { DomainModels } from '../domain-model'
import { nowIso } from '../helpers/date.helpers'
import { BadRequestError } from '../errors'

export type BoardService = typeof boardService
const boardService = {
  async createBoard(userId: DomainModels.User['userId'], title: string) {
    const board: DomainModels.Board = {
      boardId: getBoardId(),
      createdAt: nowIso(),
      ownedBy: userId,
      title: title,
    }
    await boardRepository.create(board)
    return board
  },
  async deleteBoard(boardId: DomainModels.Board['boardId']) {
    const board = await boardRepository.get(boardId)
    if (!board) throw new BadRequestError('Board not found.')
    await boardRepository.delete(boardId)
  },
}

export default boardService
