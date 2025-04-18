import { FastifyInstance } from 'fastify'
import { taskListController, taskListPath } from '../../controller/task/task-list.controller'
import { taskCreateController, taskCreatePath } from '../../controller/task/task-create.controller'
import ensureAuthenticated from '../../helpers/ensureAuthenticated'

export const taskRoutes = (server: FastifyInstance) => {
  server.get(
    taskListPath,
    {
      preValidation: ensureAuthenticated,
    },
    taskListController
  )
  server.post(
    taskCreatePath,
    {
      preValidation: ensureAuthenticated,
    },
    taskCreateController
  )
}
