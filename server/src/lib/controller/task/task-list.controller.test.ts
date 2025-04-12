import { FastifyRequest } from 'fastify'
import { Responses } from 'shared/src/http'
import { taskRepository } from '../../data-access/task.repository'
import { DomainModels } from '../../domain-model'
import { taskListController } from './task-list.controller'

describe('taskListController()', () => {
  it('should retrieve a list of tasks for the board and send it back in a response', async () => {
    // arrange
    const boardId = 'dummy-boardId'
    const request = {
      params: {
        boardId,
      },
    } as FastifyRequest
    const tasks = [
      { taskId: 'task-a', title: 'Take out trash', status: DomainModels.TaskStatus.complete },
      { taskId: 'task-b', title: 'Cook dinner', status: DomainModels.TaskStatus.notComplete },
    ] as DomainModels.Task[]
    const findAllByBoardIdSpy = jest
      .spyOn(taskRepository, 'findAllByBoard')
      .mockImplementationOnce(() => Promise.resolve(tasks))

    // act
    const result = await taskListController(request)

    // assert
    expect(result).toEqual({ tasks } as Responses.TaskListResponse)
    expect(findAllByBoardIdSpy).toHaveBeenCalledWith(boardId)
  })
})
