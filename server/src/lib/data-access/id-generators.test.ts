import { getBoardId, getTaskId, getUserId } from './id-generators'

describe('getUserId()', () => {
  it('should generate a random 18-digit alphanumeric ID', () => {
    expect(getUserId()).toMatch(/^u_[a-z0-9]+$/)
  })
})

describe('getBoardId()', () => {
  it('should generate a random 18-digit alphanumeric ID', () => {
    expect(getBoardId()).toMatch(/^b_[a-z0-9]+$/)
  })
})

describe('getTaskId()', () => {
  it('should generate a random 18-digit alphanumeric ID', () => {
    expect(getTaskId()).toMatch(/^t_[a-z0-9]+$/)
  })
})
