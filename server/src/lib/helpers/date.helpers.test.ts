import { now, nowIso } from './date.helpers'

describe('now()', () => {
  it('should create a date within 30 seconds of accuracy', () => {
    // arrange
    const realNowDate = new Date()

    // act
    const dateUnderTest = now()

    // assert
    expect(dateUnderTest).toBeInstanceOf(Date)
    const thirtySeconds = 1000 * 30
    const thirtySecondsAgo = realNowDate.getTime() - thirtySeconds
    expect(dateUnderTest.getTime()).toBeGreaterThan(thirtySecondsAgo)
    const thirtySecondsAhead = realNowDate.getTime() + thirtySeconds
    expect(dateUnderTest.getTime()).toBeLessThan(thirtySecondsAhead)
  })
})

describe('nowIso()', () => {
  it('should get an ISO-8061 string with a GMT offset', () => {
    expect(nowIso()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/)
  })
})
