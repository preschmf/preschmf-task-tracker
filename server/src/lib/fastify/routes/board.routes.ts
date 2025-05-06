import { FastifyInstance } from 'fastify'
import { boardCreateController, boardCreatePath } from '../../controller/board/board-create.controller'
import { boardListController, boardListPath } from '../../controller/board/board-list.controller'
import { boardDeleteController, boardDeletePath } from '../../controller/board/board-delete.controller'
import ensureAuthenticated from '../../helpers/ensureAuthenticated'

export const boardRoutes = (server: FastifyInstance) => {
  server.get(
    boardListPath,
    {
      preValidation: ensureAuthenticated,
    },
    boardListController
  )

  server.post(
    boardCreatePath,
    {
      preValidation: ensureAuthenticated,
    },
    boardCreateController
  )
  server.delete(
    boardDeletePath,
    {
      preValidation: ensureAuthenticated,
    },
    boardDeleteController
  )
}
