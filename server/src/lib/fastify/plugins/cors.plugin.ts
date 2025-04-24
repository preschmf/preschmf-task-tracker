import fastifyCors from '@fastify/cors'
import { FastifyInstance } from 'fastify'

export const registerCorsPlugin = (server: FastifyInstance) => {
  const frontendOrigin = process.env.CLIENT_URL || 'http://localhost:9000'
  server.register(fastifyCors, {
    origin: frontendOrigin,
    credentials: true,
  })
}
