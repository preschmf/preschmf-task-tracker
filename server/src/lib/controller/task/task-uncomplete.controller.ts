import { FastifyRequest } from 'fastify'
import { HttpMethod, RouteController } from '..'
import { getGenericSuccessResponse } from '../../fastify/fastify-handlers'
import _taskService, { TaskService } from '../../service/task.service'

export interface RequestParams {
  taskId: string
}

export class TaskUncompleteController implements RouteController {
  constructor(private taskService: TaskService) {}

  method: HttpMethod = 'patch'
  path = '/api/v1/task/:taskId/uncomplete'

  async handler(request: FastifyRequest) {
    const { taskId } = request.params as RequestParams
    await this.taskService.uncompleteTask(taskId)
    return getGenericSuccessResponse()
  }
}

export const taskUncompleteController = new TaskUncompleteController(_taskService)
