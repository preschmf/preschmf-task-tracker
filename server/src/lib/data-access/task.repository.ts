import { DomainModels } from '../domain-model'
import type { Knex } from 'knex'
import { knex } from '../../dependencies/knex'
import { NotFoundError } from '../errors'

export class TaskRepository {
  constructor(private knex: Knex) {}

  async findAllByBoard(boardId: DomainModels.Board['boardId']): Promise<DomainModels.Task[]> {
    return await this.knex.select('*').from<DomainModels.Task>('task').where('boardId', boardId)
  }

  async create(task: DomainModels.Task) {
    await this.knex.insert(task).into('task')
  }

  async delete(taskId: DomainModels.Task['taskId']) {
    await this.knex.delete().from('task').where('taskId', taskId)
  }

  async get(taskId: DomainModels.Task['taskId']): Promise<DomainModels.Task> {
    const task = await this.knex.select('*').from<DomainModels.Task>('task').where('taskId', taskId).limit(1).first()
    if (!task) throw new NotFoundError('Task not found.')

    return task
  }

  async updateStatus(taskId: DomainModels.Task['taskId'], status: DomainModels.TaskStatus) {
    await this.knex.table('task').where({ taskId }).update({ status })
  }
}

export const taskRepository = new TaskRepository(knex)
