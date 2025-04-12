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
import { Strategy as GitHubStrategy } from 'passport-github2'

const port = 8080
const GITHUB_CLIENT_ID = 'Ov23liarxK82gdExYThG'
const GITHUB_CLIENT_SECRET = '14e1cd918bf0f2ee2c4a84fb708349476c59ca77'
const CLIENT_URL = 'http://localhost:9000'

export const initialize = async (server: FastifyInstance) => {
  registerRoutes(server)
  await start(server)
}

const registerRoutes = (server: FastifyInstance) => {
  server.register(fastifySecureSession, {
    key: fs.readFileSync('./src/lib/fastify/not-so-secret-key'),
    cookie: {
      path: '/',
    },
  })
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())
  fastifyPassport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `http://localhost:${port}/api/v1/auth/github/callback`,
      },
      (accessToken, refreshToken, profile, callback) => {
        // Verify function: Called after GitHub authentication
        // Check if user exists or create a new one if not
        //store user in the db
        callback(undefined, profile)
      }
    )
  )

  fastifyPassport.registerUserDeserializer(async (user, req) => {
    //get user from db here
    //return user
    return user //since we stored the whole user in session, now we can get user from req.user in any route
  })

  fastifyPassport.registerUserSerializer(async (user, req) => {
    return user
  })

  server.get('/api/v1/login/failure', (req, res) => {
    res.status(401).send({ success: false, message: 'Login failed' })
  })
  server.get('/api/v1/login/success', (req, res) => {
    res.status(200).send({ success: true, message: 'Login successful', user: req.user })
  })
  server.get('/api/v1/logout', (req, res) => {
    req.logout()
    res.redirect(`${CLIENT_URL}/login`)
  })

  server.get(
    '/api/v1/auth/github',
    { preValidation: fastifyPassport.authenticate('github', { scope: ['profile'] }) },
    async (req, res) => {
      // This route is used to initiate GitHub authentication
      // The user will be redirected to GitHub for login
    }
  )

  server.get(
    '/api/v1/auth/github/callback',
    {
      preValidation: fastifyPassport.authenticate('github', {
        successRedirect: CLIENT_URL,
        //redirect to failure page for now
        failureRedirect: `${CLIENT_URL}/login`,
      }),
    },
    async (req, res) => {
      // Handle the callback logic here if needed
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
