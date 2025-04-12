import { ViewModels } from 'view-model'

export namespace Requests {
  export interface CreateBoardRequest {
    title: string
  }

  export interface CreateTaskRequest {
    title: string
    status: ViewModels.TaskStatus
    scheduledDate?: string
  }
}

export namespace Responses {
  export interface BoardListResponse {
    boards: ViewModels.Board[]
  }

  export interface TaskListResponse {
    tasks: ViewModels.Task[]
  }

  export interface CreateBoardResponse {
    board: ViewModels.Board
  }

  export interface CreateTaskResponse {
    task: ViewModels.Task
  }

  export interface GenericResponse {
    success: boolean
    message: string
  }
}
