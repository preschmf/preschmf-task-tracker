import { FastifyInstance } from 'fastify'
import ensureAuthenticated from '../../helpers/ensureAuthenticated'
import { userGetController } from '../../controller/user/user-get.controller'
import { userCreateController } from '../../controller/user/user-create.controller'

const userPath = '/api/v1/user'

export const userRoutes = (server: FastifyInstance) => {
  server.get(
    userPath,
    {
      preValidation: ensureAuthenticated,
    },
    userGetController
  )
  server.post(
    userPath,
    {
      preValidation: ensureAuthenticated,
    },
    userCreateController
  )
}
