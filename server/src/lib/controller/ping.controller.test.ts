import { pingController } from './ping.controller'

describe('pingController()', () => {
  it('should create a static response', async () => {
    expect(await pingController()).toEqual({ pong: 'it worked!' })
  })
})
