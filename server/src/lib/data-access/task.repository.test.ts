import { getKnexMock } from '../../../test-mocks/knex'
import { DomainModels } from '../domain-model'
import { TaskRepository } from './task.repository'

describe('UserRepository', () => {
  const knex = getKnexMock()
  const taskRepository = new TaskRepository(knex)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('findAllByBoard()', () => {
    it('retrieves all tasks for a given board', async () => {
      // arrange
      const boardId = 'dummy-boardId'
      const expectedTasks = [{ taskId: 'task-a' }, { taskId: 'task-b' }] as DomainModels.Task[]
      knex.where.mockResolvedValueOnce(expectedTasks)

      // act
      const tasks = await taskRepository.findAllByBoard(boardId)

      // assert
      expect(tasks).toEqual(expectedTasks)
      expect(knex.select).toHaveBeenCalledWith('*')
      expect(knex.from).toHaveBeenCalledWith('task')
      expect(knex.where).toHaveBeenCalledWith('boardId', boardId)
    })
  })

  describe('create()', () => {
    it('creates a task', async () => {
      // arrange
      const task = { taskId: 'task-a' } as DomainModels.Task

      // act
      await taskRepository.create(task)

      // assert
      expect(knex.insert).toHaveBeenCalledWith(task)
      expect(knex.into).toHaveBeenCalledWith('task')
    })
  })

  describe('get()', () => {
    it('should retrieve a task', async () => {
      // arrange
      const taskId = 'task-a'
      const expectedTask = { taskId } as DomainModels.Task
      knex.first.mockResolvedValueOnce(expectedTask)

      // act
      const task = await taskRepository.get(taskId)

      // assert
      expect(task).toEqual(expectedTask)
      expect(knex.select).toHaveBeenCalledWith('*')
      expect(knex.from).toHaveBeenCalledWith('task')
      expect(knex.where).toHaveBeenCalledWith('taskId', taskId)
      expect(knex.limit).toHaveBeenCalledWith(1)
      expect(knex.first).toHaveBeenCalledWith()
    })

    it('should throw an error when a task is not retrieved', async () => {
      // arrange
      const taskId = 'task-a'
      knex.first.mockResolvedValueOnce(undefined)

      // act
      const act = async () => await taskRepository.get(taskId)

      // assert
      await expect(act).rejects.toThrowError('Task not found.')
    })
  })

  describe('updateStatus()', () => {
    it('should update the status of a given task', async () => {
      // arrange
      const taskId = 'task-a'
      const status = DomainModels.TaskStatus.complete

      // act
      taskRepository.updateStatus(taskId, status)

      // assert
      expect(knex.table).toHaveBeenCalledWith('task')
      expect(knex.where).toHaveBeenCalledWith({ taskId })
      expect(knex.update).toHaveBeenCalledWith({ status })
    })
  })
})
