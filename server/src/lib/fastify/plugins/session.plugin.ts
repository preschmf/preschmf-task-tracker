import fastifySecureSession from '@fastify/secure-session'
import fs from 'fs'
import { FastifyInstance } from 'fastify'

export const registerSessionPlugin = (server: FastifyInstance) => {
  server.register(fastifySecureSession, {
    key: fs.readFileSync('./src/lib/fastify/not-so-secret-key'),
    cookie: {
      path: '/',
    },
  })
}
