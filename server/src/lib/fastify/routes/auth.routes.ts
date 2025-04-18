import { FastifyInstance } from 'fastify'
import fastifyPassport from '@fastify/passport'

export const authRoutes = (server: FastifyInstance, clientUrl: string) => {
  server.get('/api/v1/login/failure', (req, res) => {
    res.status(401).send({ success: false, message: 'Login failed' })
  })

  server.get('/api/v1/login/success', (req, res) => {
    res.status(200).send({ success: true, message: 'Login successful', user: req.user })
  })

  server.get('/api/v1/logout', async (req, res) => {
    await req.logout()
    res.status(200).send({ success: true, message: 'Logout successful' })
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
    async (req, res) => {}
  )

  server.get(
    '/api/v1/auth/google',
    { preValidation: fastifyPassport.authenticate('google', { scope: ['profile'] }) },
    async (req, res) => {}
  )

  server.get(
    '/api/v1/auth/google/callback',
    {
      preValidation: fastifyPassport.authenticate('google', {
        successRedirect: clientUrl,
        failureRedirect: `${clientUrl}/login`,
      }),
    },
    async (req, res) => {}
  )

  server.get(
    '/api/v1/auth/linkedin',
    { preValidation: fastifyPassport.authenticate('linkedin', { scope: ['profile'] }) },
    async (req, res) => {}
  )

  server.get(
    '/api/v1/auth/linkedin/callback',
    {
      preValidation: fastifyPassport.authenticate('linkedin', {
        successRedirect: clientUrl,
        failureRedirect: `${clientUrl}/login`,
      }),
    },
    async (req, res) => {}
  )
}
