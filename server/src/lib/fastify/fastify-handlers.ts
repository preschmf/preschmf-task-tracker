import { FastifyReply, FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { BadRequestError, NotFoundError } from '../errors'

export const getGenericSuccessResponse = (): Responses.GenericResponse => ({
  success: true,
  message: 'Success',
})

export const fastifyErrorHandler = (error: unknown, _: FastifyRequest, reply: FastifyReply) => {
  const statusCode = getErrorStatusCode(error)
  const responseBody: Responses.GenericResponse = {
    success: false,
    message: getErrorMessage(error),
  }
  reply.status(statusCode).send(responseBody)
}

const getErrorStatusCode = (error: unknown) => {
  if (error instanceof NotFoundError) return 404
  if (error instanceof BadRequestError) return 400
  return 500
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message
  return 'An error occured.'
}
