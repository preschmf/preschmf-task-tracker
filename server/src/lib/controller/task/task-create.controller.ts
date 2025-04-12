import { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { TaskViewModelAcl } from '../../anti-corruption/view-model.acl'
import taskService from '../../service/task.service'

export const taskCreatePath = '/api/v1/board/:boardId/task'

export const taskCreateController = async (request: FastifyRequest) => {
  const { boardId } = request.params as { boardId: string }
  const { title, status, scheduledDate } = request.body as Requests.CreateTaskRequest
  const task = await taskService.createTask(boardId, title, status, scheduledDate)
  return {
    task: TaskViewModelAcl.getTask(task),
  } as Responses.CreateTaskResponse
}
