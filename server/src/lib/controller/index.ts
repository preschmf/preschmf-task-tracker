import type { FastifyReply, FastifyRequest } from 'fastify'

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Handler<T> = HandlerWithoutParams<T> | HandlerWithRequest<T> | HandlerWithRequestAndReply<T>
type HandlerWithoutParams<T> = () => Promise<T>
type HandlerWithRequest<T> = (request: FastifyRequest) => Promise<T>
type HandlerWithRequestAndReply<T> = (request: FastifyRequest, reply: FastifyReply) => Promise<T>

export interface RouteController<T = any> {
  method: HttpMethod
  path: string
  handler: Handler<T>
}
