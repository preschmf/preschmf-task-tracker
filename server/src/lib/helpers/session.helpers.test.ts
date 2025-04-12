import { userRepository } from '../data-access/user.repository'
import { DomainModels } from '../domain-model'
import { getCurrentUser } from './session.helpers'

describe('getCurrentUser()', () => {
  const expectedUser = { userId: 'dummy-userId' } as DomainModels.User
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should throw an error if the user is not found', async () => {
    // arrange
    const getLocalUserSpy = jest.spyOn(userRepository, 'getLocalUser')
    getLocalUserSpy.mockResolvedValueOnce(undefined)

    // act
    const act = async () => await getCurrentUser()

    // assert
    await expect(act).rejects.toThrow('User not found.')
    expect(getLocalUserSpy).toHaveBeenCalledWith()
  })

  it('should retrieve the user from the repository when it has not yet been cached', async () => {
    // arrange
    const getLocalUserSpy = jest.spyOn(userRepository, 'getLocalUser')
    getLocalUserSpy.mockResolvedValueOnce(expectedUser)

    // act
    const user = await getCurrentUser()

    // assert
    expect(user).toEqual(expectedUser)
    expect(getLocalUserSpy).toHaveBeenCalledWith()
  })

  it('should retrieve the cached user when it was previously cached', async () => {
    // arrange
    const getLocalUserSpy = jest.spyOn(userRepository, 'getLocalUser')

    // act
    const user = await getCurrentUser()

    // assert
    expect(user).toEqual(expectedUser)
    expect(getLocalUserSpy).not.toHaveBeenCalled()
  })
})
