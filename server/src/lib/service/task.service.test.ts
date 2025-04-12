import * as idGenerators from '../data-access/id-generators'
import * as dateHelpers from '../helpers/date.helpers'
import { DomainModels } from '../domain-model'
import { TaskService } from './task.service'
import { TaskRepository } from '../data-access/task.repository'
import { mockObject } from 'shared/src/test-helpers'

describe('TaskService', () => {
  const taskRepository = mockObject<TaskRepository>(['create', 'get', 'updateStatus'])
  const taskService = new TaskService(taskRepository)
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('createTask()', () => {
    it('should create and persist a new task under a given board', async () => {
      // arrange
      const getTaskIdSpy = jest.spyOn(idGenerators, 'getTaskId')
      const taskId = 'dummy-taskId'
      getTaskIdSpy.mockReturnValueOnce(taskId)
      const nowIsoSpy = jest.spyOn(dateHelpers, 'nowIso')
      const createdAt = '2023-01-01T00:00:00.000Z'
      nowIsoSpy.mockReturnValueOnce(createdAt)
      const boardId = 'dummy-boardId'
      const title = 'Write unit tests'
      const status = DomainModels.TaskStatus.notComplete
      const scheduledDate = '2023-02-01'
      const expectedTask: DomainModels.Task = {
        taskId,
        boardId,
        title,
        createdAt,
        status,
        scheduledDate,
      }

      // act
      const task = await taskService.createTask(boardId, title, status, scheduledDate)

      // assert
      expect(task).toEqual(expectedTask)
      expect(getTaskIdSpy).toHaveBeenCalledWith()
      expect(nowIsoSpy).toHaveBeenCalledWith()
      expect(taskRepository.create).toHaveBeenCalledWith(expectedTask)
    })
  })

  describe('completeTask()', () => {
    it('should complete the task if it is NOT already complete', async () => {
      // arrange
      const taskId = 'task-a'
      const task = { taskId, status: DomainModels.TaskStatus.notComplete } as DomainModels.Task
      taskRepository.get.mockResolvedValueOnce(task)

      // act
      await taskService.completeTask(taskId)

      // assert
      expect(taskRepository.updateStatus).toHaveBeenCalledWith(taskId, DomainModels.TaskStatus.complete)
    })

    it('should throw an error if the task is ALREADY complete', async () => {
      // arrange
      const taskId = 'task-a'
      const task = { taskId, status: DomainModels.TaskStatus.complete } as DomainModels.Task
      taskRepository.get.mockResolvedValueOnce(task)

      // act
      const act = async () => await taskService.completeTask(taskId)

      // assert
      await expect(act).rejects.toThrowError('Task is already complete.')
    })
  })

  describe('uncompleteTask()', () => {
    it('should uncomplete the task if it is complete', async () => {
      // arrange
      const taskId = 'task-a'
      const task = { taskId, status: DomainModels.TaskStatus.complete } as DomainModels.Task
      taskRepository.get.mockResolvedValueOnce(task)

      // act
      await taskService.uncompleteTask(taskId)

      // assert
      expect(taskRepository.updateStatus).toHaveBeenCalledWith(taskId, DomainModels.TaskStatus.notComplete)
    })

    it('should throw an error if the task is ALREADY uncomplete', async () => {
      // arrange
      const taskId = 'task-a'
      const task = { taskId, status: DomainModels.TaskStatus.notComplete } as DomainModels.Task
      taskRepository.get.mockResolvedValueOnce(task)

      // act
      const act = async () => await taskService.uncompleteTask(taskId)

      // assert
      await expect(act).rejects.toThrowError('Task is already not complete.')
    })
  })
})
