import dotenv from 'dotenv'
dotenv.config()
import Fastify, { FastifyInstance } from 'fastify'
import { initialize } from './lib/fastify/fastify-initializer'

const server: FastifyInstance = Fastify({})
initialize(server)
