import { FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { mockObject } from 'shared/src/test-helpers'
import { TaskService } from '../../service/task.service'
import { TaskUncompleteController, RequestParams } from './task-uncomplete.controller'

describe('TaskUncompleteController', () => {
  const taskService = mockObject<TaskService>(['uncompleteTask'])
  const taskUncompleteController = new TaskUncompleteController(taskService)
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('handler()', () => {
    it('should complete a given task', async () => {
      // arrange
      const taskId = 'task-a'
      const request = {
        params: {
          taskId,
        } as RequestParams,
      } as FastifyRequest
      const expectedResponse = {
        success: true,
        message: 'Success',
      } as Responses.GenericResponse

      // act
      const response = await taskUncompleteController.handler(request)

      // assert
      expect(response).toEqual(expectedResponse)
      expect(taskService.uncompleteTask).toHaveBeenCalledWith(taskId)
    })
  })
})
