export type MockedObject<T> = Record<keyof T, jest.Mock> & T

export const mockObject = <T>(methods: (keyof T)[]): MockedObject<T> => {
  const mockEntries = methods.map((name) => [name, jest.fn()])
  const mockedObject = Object.fromEntries(mockEntries)
  return mockedObject as Partial<MockedObject<T>> as MockedObject<T>
}

export const expectFunction = (value: unknown) => {
  expect(typeof value).toBe('function')
}
