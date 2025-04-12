import { add } from 'helpers'

describe('add()', () => {
  it('should equal 1', () => {
    const sum = add(1, 0)
    expect(sum).toEqual(1)
  })
})
