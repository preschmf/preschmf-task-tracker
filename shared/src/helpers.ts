import { ViewModels } from './view-model'

export const isComplete = (task: ViewModels.Task) => task.status === ViewModels.TaskStatus.complete
export const isUncomplete = (task: ViewModels.Task) => task.status === ViewModels.TaskStatus.notComplete
