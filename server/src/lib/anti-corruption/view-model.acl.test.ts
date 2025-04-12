import { ViewModels } from 'shared/src/view-model'
import { DomainModels } from '../domain-model'
import { BoardViewModelAcl, TaskViewModelAcl } from './view-model.acl'

describe('TaskViewModelAcl', () => {
  const domainModel = {
    taskId: 'dummy-taskId',
    title: 'dummy-title',
    status: DomainModels.TaskStatus.complete,
    createdAt: '2023-01-01T00:00:00.000Z',
  } as DomainModels.Task
  const expectedViewModel: ViewModels.Task = {
    taskId: domainModel.taskId,
    title: domainModel.title,
    status: domainModel.status,
  }

  describe('getTask()', () => {
    it('converts the domain model to a view model without the extra fields', () => {
      const viewModel = TaskViewModelAcl.getTask(domainModel)
      expect(viewModel).toEqual(expectedViewModel)
    })
  })

  describe('getTaskList()', () => {
    it('converts the domain model to a view model without the extra fields', () => {
      const viewModelList = TaskViewModelAcl.getTaskList([domainModel])
      expect(viewModelList).toEqual([expectedViewModel])
    })
  })
})

describe('BoardViewModelAcl', () => {
  const domainModel = {
    boardId: 'dummy-boardId',
    title: 'dummy-title',
    ownedBy: 'dummy-ownedBy',
  } as DomainModels.Board
  const expectedViewModel: ViewModels.Board = {
    boardId: domainModel.boardId,
    title: domainModel.title,
  }

  describe('getBoard()', () => {
    it('converts the domain model to a view model without the extra fields', () => {
      const viewModel = BoardViewModelAcl.getBoard(domainModel)
      expect(viewModel).toEqual(expectedViewModel)
    })
  })

  describe('getBoardList()', () => {
    it('converts the domain model to a view model without the extra fields', () => {
      const viewModelList = BoardViewModelAcl.getBoardList([domainModel])
      expect(viewModelList).toEqual([expectedViewModel])
    })
  })
})
