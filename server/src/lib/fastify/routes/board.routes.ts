import { FastifyInstance } from 'fastify'
import { boardCreateController } from '../../controller/board/board-create.controller'
import { boardListController } from '../../controller/board/board-list.controller'
import ensureAuthenticated from '../../helpers/ensureAuthenticated'

const boardListPath = '/api/v1/board'
const boardCreatePath = '/api/v1/board'

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
}
