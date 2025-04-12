import { getTaskId } from '../data-access/id-generators'
import { taskRepository as _taskRepository, TaskRepository } from '../data-access/task.repository'
import { DomainModels } from '../domain-model'
import { nowIso } from '../helpers/date.helpers'
import { isComplete, isUncomplete } from 'shared/src/helpers'
import { BadRequestError } from '../errors'

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(
    boardId: DomainModels.Board['boardId'],
    title: string,
    status: DomainModels.TaskStatus,
    scheduledDate?: string
  ) {
    const task: DomainModels.Task = {
      taskId: getTaskId(),
      boardId,
      title,
      createdAt: nowIso(),
      status,
      scheduledDate,
    }
    await this.taskRepository.create(task)
    return task
  }

  async completeTask(taskId: DomainModels.Task['taskId']) {
    const task = await this.taskRepository.get(taskId)
    if (isComplete(task)) throw new BadRequestError('Task is already complete.')

    await this.taskRepository.updateStatus(taskId, DomainModels.TaskStatus.complete)
  }

  async uncompleteTask(taskId: DomainModels.Task['taskId']) {
    const task = await this.taskRepository.get(taskId)
    if (isUncomplete(task)) throw new BadRequestError('Task is already not complete.')

    await this.taskRepository.updateStatus(taskId, DomainModels.TaskStatus.notComplete)
  }
}

const taskService = new TaskService(_taskRepository)
export default taskService
