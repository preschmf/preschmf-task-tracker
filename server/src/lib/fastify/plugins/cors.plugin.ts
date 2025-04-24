import fastifyCors from '@fastify/cors'
import { FastifyInstance } from 'fastify'

export const registerCorsPlugin = (server: FastifyInstance, clientUrl: string) => {
  server.register(fastifyCors, {
    origin: clientUrl,
    credentials: true,
  })
}
