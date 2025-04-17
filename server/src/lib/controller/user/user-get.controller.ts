import type { FastifyReply, FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { UserViewModelAcl } from '../../anti-corruption/view-model.acl'
import { userRepository } from '../../data-access/user.repository'

export const userPath = '/api/v1/user'

export const userGetController = async (request: FastifyRequest) => {
  const { id } = request.user as Requests.GetUserRequest
  const user = await userRepository.findById(id)
  if (!user) {
    throw new Error(`User with id:${id} not found`)
  }
  return {
    user: UserViewModelAcl.getUser(user),
  } as Responses.GetUserResponse
}
