import fastifySecureSession from '@fastify/secure-session'
import fs from 'fs'
import { FastifyInstance } from 'fastify'

export const registerSessionPlugin = (server: FastifyInstance) => {
  const secureSessionKey = process.env.SECURE_SESSION_KEY
  if (!secureSessionKey) {
    throw new Error('SECURE_SESSION_KEY not found')
  }
  server.register(fastifySecureSession, {
    key: Buffer.from(secureSessionKey, 'base64'),
    cookie: {
      path: '/',
    },
  })
}
