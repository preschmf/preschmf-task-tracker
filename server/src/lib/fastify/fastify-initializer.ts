import type { FastifyInstance } from 'fastify'
import { boardListController, boardListPath } from '../controller/board/board-list.controller'
import { boardCreateController, boardCreatePath } from '../controller/board/board-create.controller'
import { taskListController, taskListPath } from '../controller/task/task-list.controller'
import { taskCreateController, taskCreatePath } from '../controller/task/task-create.controller'
import { pingController, pingPath } from '../controller/ping.controller'
import { taskCompleteController } from '../controller/task/task-complete.controller'
import { fastifyErrorHandler } from './fastify-handlers'
import { taskUncompleteController } from '../controller/task/task-uncomplete.controller'
import { userGetController, userPath } from '../controller/user/user-get.controller'
import { userCreateController } from '../controller/user/user-create.controller'
import { userRepository } from '../data-access/user.repository'
import userService from '../service/user.service'
import fastifySecureSession from '@fastify/secure-session'
import fastifyPassport from '@fastify/passport'
import { RouteController } from '../controller'
import fs from 'fs'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { DomainModels } from '../domain-model'
import ensureAuthenticated from '../helpers/ensureAuthenticated'

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080
const gitHubClientId = process.env.GITHUB_CLIENT_ID || ''
const gitHubClientSecret = process.env.GITHUB_CLIENT_SECRET || ''
const baseUrl = process.env.BASE_URL || 'http://localhost:8080'
const clientUrl = process.env.CLIENT_URL || 'http://localhost:9000'

export const initialize = async (server: FastifyInstance) => {
  registerRoutes(server)
  await start(server)
}

const registerRoutes = (server: FastifyInstance) => {
  server.register(fastifySecureSession, {
    key: fs.readFileSync('./src/lib/fastify/not-so-secret-key'),
    // check into possibly adding:
    // httpOnly: true
    // secure: process.env.NODE_ENV === 'production'
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
        clientID: gitHubClientId,
        clientSecret: gitHubClientSecret,
        callbackURL: `${baseUrl}/api/v1/auth/github/callback`,
      },
      async (accessToken: string, refreshToken: string, profile: any, callback: Function) => {
        try {
          const userId = profile.id + profile.username

          const user = await userRepository.findByUserId(userId)
          console.log('userQuery results: ' + JSON.stringify(user))

          if (user) {
            return callback(undefined, user)
          } else {
            const newUser = await userService.createUser(profile.id, profile.username)
            return callback(undefined, newUser)
          }
        } catch (error) {
          console.error('Error during GitHub authentication:', error)
          return callback(error)
        }
      }
    )
  )

  fastifyPassport.registerUserDeserializer(async (id: string, req) => {
    try {
      const user = await userRepository.findById(id)
      if (!user) {
        throw new Error(`User with id:${id} not found`)
      }
      return user
    } catch (error) {
      console.error('Error in deserializer:', error)
      throw error
    }
  })

  fastifyPassport.registerUserSerializer(async (user: DomainModels.User, req) => {
    return user.id
  })

  server.get('/api/v1/login/failure', (req, res) => {
    res.status(401).send({ success: false, message: 'Login failed' })
  })
  server.get('/api/v1/login/success', (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).send({ success: false, message: 'User not authenticated' })
    }
    res.status(200).send({ success: true, message: 'Login successful', user: req.user })
  })
  server.get('/api/v1/logout', (req, res) => {
    req.logout()
    res.redirect(`${clientUrl}/login`)
  })

  server.get(
    '/api/v1/auth/github',
    { preValidation: fastifyPassport.authenticate('github', { scope: ['profile'] }) },
    async (req, res) => {}
  )

  server.get(
    '/api/v1/auth/github/callback',
    {
      preValidation: fastifyPassport.authenticate('github', {
        successRedirect: clientUrl,
        failureRedirect: `${clientUrl}/login`,
      }),
    },
    async (req, res) => {
      // Handle login failure logic here
    }
  )

  server.get(pingPath, pingController)
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
    console.log(`Server listening at ${baseUrl}/api/v1/ping`)
  } catch (err) {
    console.log('Caught error', { err })
    server.log.error(err)
    process.exit(1)
  }
}
