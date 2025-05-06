export namespace ViewModels {
  export enum TaskStatus {
    notComplete = 'notComplete',
    complete = 'complete',
  }

  export interface Task {
    taskId: string
    title: string
    status: TaskStatus
    createdAt: string
  }

  export interface Board {
    boardId: string
    title: string
  }

  export interface User {
    userId: string
    username: string
  }
}
