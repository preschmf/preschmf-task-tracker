import { ViewModels } from 'shared/src/view-model'
import { DomainModels } from '../domain-model'

export class TaskViewModelAcl {
  static getTask(domainModel: DomainModels.Task): ViewModels.Task {
    return {
      taskId: domainModel.taskId,
      title: domainModel.title,
      status: domainModel.status,
    }
  }

  static getTaskList(domainModels: DomainModels.Task[]): ViewModels.Task[] {
    return domainModels.map(this.getTask)
  }
}

export class BoardViewModelAcl {
  static getBoard(domainModel: DomainModels.Board): ViewModels.Board {
    return {
      boardId: domainModel.boardId,
      title: domainModel.title,
    }
  }

  static getBoardList(domainModels: DomainModels.Board[]): ViewModels.Board[] {
    return domainModels.map(this.getBoard)
  }
}
