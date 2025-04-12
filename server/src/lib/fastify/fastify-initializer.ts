import type { FastifyInstance } from 'fastify'
import { boardListController, boardListPath } from '../controller/board/board-list.controller'
import { boardCreateController, boardCreatePath } from '../controller/board/board-create.controller'
import { taskListController, taskListPath } from '../controller/task/task-list.controller'
import { taskCreateController, taskCreatePath } from '../controller/task/task-create.controller'
import { pingController, pingPath } from '../controller/ping.controller'
import { taskCompleteController } from '../controller/task/task-complete.controller'
import { fastifyErrorHandler } from './fastify-handlers'
import { taskUncompleteController } from '../controller/task/task-uncomplete.controller'
import fastifySecureSession from '@fastify/secure-session'
import fastifyPassport from '@fastify/passport'
import { RouteController } from '../controller'
import fs from 'fs'
import GitHubStrategy from 'passport-github'

const port = 8080

export const initialize = async (server: FastifyInstance) => {
  registerRoutes(server)
  await start(server)
}

const registerRoutes = (server: FastifyInstance) => {
  server.register(fastifySecureSession, {
    key: fs.readFileSync('./src/lib/fastify/not-so-secret-key'),
  })
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())
  fastifyPassport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: 'Ov23liarxK82gdExYThG',
        clientSecret: '14e1cd918bf0f2ee2c4a84fb708349476c59ca77',
        callbackURL: `http://localhost:${port}/api/v1/auth/github/callback`,
      },
      (accessToken, refreshToken, profile, cb) => {
        cb(undefined, profile)
      }
    )
  )

  server.get(
    '/api/v1/auth/github',
    { preValidation: fastifyPassport.authenticate('github', { scope: ['profile'] }) },
    (req, res) => {
      res.redirect('/')
    }
  )
  server.get(pingPath, pingController)
  server.get(boardListPath, boardListController)
  server.post(boardCreatePath, boardCreateController)
  server.get(taskListPath, taskListController)
  server.post(taskCreatePath, taskCreateController)
  registerControllerAsRoute(server, taskCompleteController)
  registerControllerAsRoute(server, taskUncompleteController)
}

const registerControllerAsRoute = (fastify: FastifyInstance, controller: RouteController) => {
  fastify[controller.method](controller.path, controller.handler.bind(controller))
}

const start = async (server: FastifyInstance) => {
  try {
    server.setErrorHandler(fastifyErrorHandler)
    await server.listen({ port })
    console.log(`Server listening at http://localhost:${port}/api/v1/ping`)
  } catch (err) {
    console.log('Caught error', { err })
    server.log.error(err)
    process.exit(1)
  }
}
