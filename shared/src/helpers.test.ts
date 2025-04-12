import { isComplete, isUncomplete } from 'helpers'
import { ViewModels } from './view-model'

describe('isComplete()', () => {
  ;[
    [ViewModels.TaskStatus.complete, true],
    [ViewModels.TaskStatus.notComplete, false],
  ].forEach(([status, expectedResult]) => {
    it(`should be ${expectedResult} when status = ${status}`, () => {
      const task = { status } as ViewModels.Task
      expect(isComplete(task)).toEqual(expectedResult)
    })
  })
})

describe('isUncomplete()', () => {
  ;[
    [ViewModels.TaskStatus.complete, false],
    [ViewModels.TaskStatus.notComplete, true],
  ].forEach(([status, expectedResult]) => {
    it(`should be ${expectedResult} when status = ${status}`, () => {
      const task = { status } as ViewModels.Task
      expect(isUncomplete(task)).toEqual(expectedResult)
    })
  })
})
