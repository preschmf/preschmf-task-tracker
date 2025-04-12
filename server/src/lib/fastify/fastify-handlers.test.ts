import { FastifyReply, FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { mockObject } from 'shared/src/test-helpers'
import { BadRequestError, NotFoundError } from '../errors'
import { fastifyErrorHandler, getGenericSuccessResponse } from './fastify-handlers'

describe('getGenericSuccessResponse()', () => {
  it('should create a successful response', () => {
    const response = getGenericSuccessResponse()
    const expectedResponse: Responses.GenericResponse = {
      success: true,
      message: 'Success',
    }
    expect(response).toEqual(expectedResponse)
  })
})

const genericMessage = 'An error occured.'
describe('fastifyErrorHandler()', () => {
  const reply = mockObject<FastifyReply>(['status', 'send'])
  reply.status.mockReturnThis()
  afterEach(() => {
    jest.clearAllMocks()
  })
  ;[
    {
      scenerio: 'should create an error response with a 404 code and generic text',
      inputError: new NotFoundError(),
      expectedCode: 404,
      expectedMessage: genericMessage,
    },
    {
      scenerio: 'should create an error response with a 400 code and generic text',
      inputError: new BadRequestError(),
      expectedCode: 400,
      expectedMessage: genericMessage,
    },
    {
      scenerio: 'should create an error response with a 500 code and generic text',
      inputError: new Error(),
      expectedCode: 500,
      expectedMessage: genericMessage,
    },
    {
      scenerio:
        'should create an error response with a 500 code and generic text since the error is not an "Error" instance',
      inputError: 'error that is NOT an instance of the "Error" class',
      expectedCode: 500,
      expectedMessage: genericMessage,
    },
    {
      scenerio: 'should create an error response with a 500 code and custom error message',
      inputError: new Error('custom error message'),
      expectedCode: 500,
      expectedMessage: 'custom error message',
    },
  ].forEach(({ scenerio, inputError, expectedCode, expectedMessage }) => {
    it(scenerio, () => {
      // arrange
      const expectedResponseBody: Responses.GenericResponse = {
        success: false,
        message: expectedMessage,
      }

      // act
      fastifyErrorHandler(inputError, {} as FastifyRequest, reply)

      // assert
      expect(reply.status).toHaveBeenCalledWith(expectedCode)
      expect(reply.send).toHaveBeenCalledWith(expectedResponseBody)
    })
  })
})
