import { FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { mockObject } from 'shared/src/test-helpers'
import { TaskService } from '../../service/task.service'
import { RequestParams, TaskCompleteController } from './task-complete.controller'

describe('TaskCompleteController', () => {
  const taskService = mockObject<TaskService>(['completeTask'])
  const taskCompleteController = new TaskCompleteController(taskService)
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
      const response = await taskCompleteController.handler(request)

      // assert
      expect(response).toEqual(expectedResponse)
      expect(taskService.completeTask).toHaveBeenCalledWith(taskId)
    })
  })
})
