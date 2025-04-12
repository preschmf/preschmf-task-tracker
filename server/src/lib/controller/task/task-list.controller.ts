import { FastifyRequest, RouteHandlerMethod } from 'fastify'
import { Responses } from 'shared/src/http'
import { TaskViewModelAcl } from '../../anti-corruption/view-model.acl'
import { taskRepository } from '../../data-access/task.repository'

export const taskListPath = '/api/v1/board/:boardId/task'

export const taskListController = async (request: FastifyRequest) => {
  const { boardId } = request.params as { boardId: string }
  const tasks = await taskRepository.findAllByBoard(boardId)
  return {
    tasks: TaskViewModelAcl.getTaskList(tasks),
  } as Responses.TaskListResponse
}
