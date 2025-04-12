export namespace DomainModels {
  export enum TaskStatus {
    notComplete = 'notComplete',
    complete = 'complete',
  }

  export interface Task {
    taskId: string
    boardId: Board['boardId']
    title: string
    createdAt: string
    scheduledDate?: string
    status: TaskStatus
  }

  export interface Board {
    boardId: string
    createdAt: string
    ownedBy: User['userId']
    title: string
  }

  export interface User {
    userId: string
    name: string
  }
}
