import type { FastifyInstance } from 'fastify'
import { RouteController } from '../controller'
import { taskCompleteController } from '../controller/task/task-complete.controller'
import { taskUncompleteController } from '../controller/task/task-uncomplete.controller'
import { pingController, pingPath } from '../controller/ping.controller'
import { fastifyErrorHandler } from './fastify-handlers'
import { registerSessionPlugin } from './plugins/session.plugin'
import { registerPassportPlugin } from './plugins/passport.plugin'
import { registerCorsPlugin } from './plugins/cors.plugin'
import { taskRoutes } from './routes/task.routes'
import { authRoutes } from './routes/auth.routes'
import { boardRoutes } from './routes/board.routes'
import { userRoutes } from './routes/user.routes'

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080

export const initialize = async (server: FastifyInstance) => {
  registerSessionPlugin(server)
  registerPassportPlugin(server)
  registerCorsPlugin(server)

  authRoutes(server, process.env.CLIENT_URL || 'http://localhost:9000')
  boardRoutes(server)
  userRoutes(server)
  taskRoutes(server)
  registerRoutes(server)
  await start(server)
}

const registerRoutes = (server: FastifyInstance) => {
  server.get(pingPath, pingController)
  registerControllerAsRoute(server, taskCompleteController)
  registerControllerAsRoute(server, taskUncompleteController)
}

const registerControllerAsRoute = (fastify: FastifyInstance, controller: RouteController) => {
  fastify[controller.method](controller.path, controller.handler.bind(controller))
}

const start = async (server: FastifyInstance) => {
  try {
    server.setErrorHandler(fastifyErrorHandler)
    await server.listen({ port, host: '0.0.0.0' })
    console.log(`Server listening at ${process.env.PORT || 'http://localhost:8080'}/api/v1`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
