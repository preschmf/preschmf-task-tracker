import { userRepository } from '../data-access/user.repository'
import { DomainModels } from '../domain-model'

let user: DomainModels.User
export type GetCurrentUserFn = typeof getCurrentUser
export const getCurrentUser = async () => {
  if (user) return user

  const _user = await userRepository.getLocalUser()
  if (!_user) throw new Error('User not found.')

  return (user = _user)
}
