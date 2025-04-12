import { FastifyInstance } from 'fastify'
import { mockObject } from 'shared/src/test-helpers'
import { boardCreatePath } from '../controller/board/board-create.controller'
import { boardListPath } from '../controller/board/board-list.controller'
import { pingPath } from '../controller/ping.controller'
import { taskCompleteController } from '../controller/task/task-complete.controller'
import { taskCreatePath } from '../controller/task/task-create.controller'
import { taskListPath } from '../controller/task/task-list.controller'
import { taskUncompleteController } from '../controller/task/task-uncomplete.controller'
import { initialize } from './fastify-initializer'

describe('initialize()', () => {
  const server = mockObject<FastifyInstance>(['get', 'post', 'put', 'patch', 'delete', 'listen', 'setErrorHandler'])
  server.log = mockObject(['error'])
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register routes and start the app', async () => {
    // act
    await initialize(server)

    // assert
    expect(server.get).toHaveBeenCalledTimes(3)
    expect(server.get).toHaveBeenNthCalledWith(1, pingPath, expect.any(Function))
    expect(server.get).toHaveBeenNthCalledWith(2, boardListPath, expect.any(Function))
    expect(server.post).toHaveBeenCalledTimes(2)
    expect(server.post).toHaveBeenNthCalledWith(1, boardCreatePath, expect.any(Function))
    expect(server.get).toHaveBeenNthCalledWith(3, taskListPath, expect.any(Function))
    expect(server.post).toHaveBeenNthCalledWith(2, taskCreatePath, expect.any(Function))
    expect(server.patch).toHaveBeenCalledTimes(2)
    expect(server.patch).toHaveBeenNthCalledWith(1, taskCompleteController.path, expect.any(Function))
    expect(server.patch).toHaveBeenNthCalledWith(2, taskUncompleteController.path, expect.any(Function))
    expect(server.setErrorHandler).toHaveBeenCalledWith(expect.any(Function))
    expect(server.listen).toHaveBeenCalledWith({ port: 8080 })
    expect(consoleLogSpy).toHaveBeenCalledWith('Server listening at http://localhost:8080/api/v1/ping')
  })

  it('should log an error and exit the process if an exception is caught', async () => {
    // arrange
    const processExitSpy = jest.spyOn(process, 'exit')
    processExitSpy.mockImplementationOnce((() => {}) as any)
    server.listen.mockImplementationOnce(() => {
      throw new Error()
    })

    // act
    await initialize(server)

    // assert
    expect(consoleLogSpy).toHaveBeenCalledWith('Caught error', { err: expect.any(Error) })
    expect(server.log.error).toHaveBeenCalledWith(expect.any(Error))
    expect(processExitSpy).toHaveBeenCalledWith(1)
  })
})
