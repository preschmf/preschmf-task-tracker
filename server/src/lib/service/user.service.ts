import { userRepository } from '../data-access/user.repository'
import { DomainModels } from '../domain-model'
import { nowIso } from '../helpers/date.helpers'
import { getUserId } from '../data-access/id-generators'

export type UserService = typeof userService
const userService = {
  async createUser(id: string, username: string) {
    const user: DomainModels.User = {
      id: getUserId(),
      userId: id + username,
      createdAt: nowIso(),
      username: username,
    }
    await userRepository.create(user)
    return user
  },
}

export default userService
