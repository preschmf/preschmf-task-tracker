import type { FastifyRequest } from 'fastify'
import { Requests, Responses } from 'shared/src/http'
import { UserViewModelAcl } from '../../anti-corruption/view-model.acl'
import userService from '../../service/user.service'

export const userPath = '/api/v1/user'

export const userCreateController = async (request: FastifyRequest) => {
  const { username, profileId } = request.body as Requests.CreateUserRequest
  const userDomainModel = await userService.createUser(profileId, username)
  const user = UserViewModelAcl.getUser(userDomainModel)
  return {
    user,
  } as Responses.CreateUserResponse
}
