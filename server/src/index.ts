import Fastify, { FastifyInstance } from 'fastify'
import { initialize } from './lib/fastify/fastify-initializer'

const server: FastifyInstance = Fastify({})
initialize(server)
