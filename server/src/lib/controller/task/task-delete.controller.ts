import { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { TaskViewModelAcl } from '../../anti-corruption/view-model.acl'
import taskService from '../../service/task.service'

export const taskDeletePath = '/api/v1/board/:boardId/task'

export const taskDeleteController = async (request: FastifyRequest) => {
  const { boardId } = request.params as { boardId: string }
  const { title, status, scheduledDate } = request.body as Requests.DeleteTaskRequest
  const task = await taskService.deleteTask(boardId)
  return {
    success: true,
  } as Responses.DeleteTaskResponse
}
