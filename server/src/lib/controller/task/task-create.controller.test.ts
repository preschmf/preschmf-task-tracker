import { FastifyRequest } from 'fastify'
import { ViewModels } from 'shared/src/view-model'
import { DomainModels } from '../../domain-model'
import { taskCreateController } from './task-create.controller'
import taskService from '../../service/task.service'
import { Responses } from 'shared/src/http'

describe('taskCreateController()', () => {
  it('should create a task and send back the created task in an http response', async () => {
    // arrange
    const boardId = 'dummy-boardId'
    const title = 'Take out trash'
    const status = ViewModels.TaskStatus.notComplete
    const scheduledDate = '2023-02-01'
    const request = {
      params: {
        boardId,
      },
      body: {
        title,
        status,
        scheduledDate,
      },
    } as FastifyRequest
    const task = {
      taskId: 'dummy-taskId',
      title,
      status,
    } as DomainModels.Task
    const createTaskSpy = jest.spyOn(taskService, 'createTask').mockImplementationOnce(() => Promise.resolve(task))

    // act
    const result = await taskCreateController(request)

    // assert

    expect(result).toEqual({ task } as Responses.CreateTaskResponse)
    expect(createTaskSpy).toHaveBeenCalledWith(boardId, title, status, scheduledDate)
  })
})
