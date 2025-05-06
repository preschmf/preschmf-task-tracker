import { ViewModels } from 'shared/src/view-model'
import { DomainModels } from '../domain-model'

export class TaskViewModelAcl {
  static getTask(domainModel: DomainModels.Task): ViewModels.Task {
    return {
      taskId: domainModel.taskId,
      title: domainModel.title,
      status: domainModel.status,
      createdAt: domainModel.createdAt,
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

export class UserViewModelAcl {
  static getUser(domainModel: DomainModels.User): ViewModels.User {
    return {
      userId: domainModel.userId,
      username: domainModel.username,
    }
  }

  static getUserList(domainModels: DomainModels.User[]): ViewModels.User[] {
    return domainModels.map(this.getUser)
  }
}
