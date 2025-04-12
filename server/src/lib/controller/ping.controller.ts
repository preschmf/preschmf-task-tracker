export const pingPath = '/api/v1/ping'

export const pingController = async () => {
  return { pong: 'it worked!' }
}
