import fastifyPassport from '@fastify/passport'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import { userRepository } from '../../data-access/user.repository'
import userService from '../../service/user.service'
import { FastifyInstance } from 'fastify'
import { DomainModels } from '../../domain-model'

export const registerPassportPlugin = (server: FastifyInstance) => {
  server.register(fastifyPassport.initialize())
  server.register(fastifyPassport.secureSession())

  fastifyPassport.use(
    'github',
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        callbackURL: `${process.env.BASE_URL || 'http://localhost:8080'}/api/v1/auth/github/callback`,
      },
      async (accessToken: string, refreshToken: string, profile: any, callback: Function) => {
        try {
          const userId = profile.id + profile.username
          const user = await userRepository.findByUserId(userId)
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
  fastifyPassport.use(
    'google',
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env.BASE_URL || 'http://localhost:8080'}/api/v1/auth/google/callback`,
        passReqToCallback: true,
      },
      async (request: any, accessToken: string, refreshToken: string, profile: any, callback: Function) => {
        try {
          const userId = profile.id + profile.name.givenName
          const user = await userRepository.findByUserId(userId)
          if (user) {
            return callback(undefined, user)
          } else {
            const newUser = await userService.createUser(profile.id, profile.name.givenName)
            return callback(undefined, newUser)
          }
        } catch (error) {
          console.error('Error during Google authentication:', error)
          return callback(error)
        }
      }
    )
  )

  fastifyPassport.use(
    'linkedin',
    new LinkedInStrategy(
      {
        clientID: process.env.LINKEDIN_KEY || '',
        clientSecret: process.env.LINKEDIN_SECRET || '',
        callbackURL: `${process.env.BASE_URL || 'http://localhost:8080'}/api/v1/auth/linkedin/callback`,
        scope: ['email', 'profile', 'openid'],
        passReqToCallback: true,
      },
      async (req: any, accessToken: string, refreshToken: string, profile: any, callback: Function) => {
        try {
          const userId = profile.id + profile.name.givenName
          console.log('LinkedIn profile:', profile)
          const user = await userRepository.findByUserId(userId)
          if (user) {
            return callback(undefined, user)
          } else {
            const newUser = await userService.createUser(profile.id, profile.name.givenName)
            return callback(undefined, newUser)
          }
        } catch (error) {
          console.error('Error during LinkedIn authentication:', error)
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
}
