import { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import taskService from '../../service/task.service'

export const taskDeletePath = '/api/v1/task/:taskId'

export const taskDeleteController = async (request: FastifyRequest) => {
  const { taskId } = request.params as { taskId: string }
  await taskService.deleteTask(taskId)
  return {
    success: true,
  } as Responses.DeleteTaskResponse
}
