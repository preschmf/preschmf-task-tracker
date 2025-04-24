import React, { useState, useEffect, ChangeEvent } from 'react'
import { useQuery, useMutation } from 'react-query'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CreateTaskInput from './CreateTaskInput'
import Task from './Task'
import taskTrackerApi from '../src/utils/taskTrackerApi'
import { ViewModels } from '../../shared/src/view-model'

const TaskList = ({ board }: { board: ViewModels.Board }) => {
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false)

  const taskListQuery = useQuery({
    queryFn: () => {
      return taskTrackerApi.get(`/api/v1/board/${board?.boardId}/task`)
    },
    refetchOnWindowFocus: false,
    queryKey: ['task-list', board?.boardId],
  })

  const createTaskMutation = useMutation({
    mutationFn: (title: string) => {
      return taskTrackerApi.post(`/api/v1/board/${board.boardId}/task`, {
        title,
        status: ViewModels.TaskStatus.notComplete,
      })
    },
  })

  const changeTaskStatusMutation = useMutation({
    mutationFn: (task: ViewModels.Task) => {
      if (task.status === ViewModels.TaskStatus.notComplete) {
        return taskTrackerApi.patch(`/api/v1/task/${task.taskId}/complete`)
      } else if (task.status === ViewModels.TaskStatus.complete) {
        return taskTrackerApi.patch(`/api/v1/task/${task.taskId}/uncomplete`)
      }
      throw new Error('task status is invalid or could not be retrieved')
    },
  })

  useEffect(() => {
    taskListQuery.refetch()
    setShowTaskInput(false)
  }, [createTaskMutation.isSuccess, changeTaskStatusMutation.isSuccess])

  if (taskListQuery.isLoading) {
    return (
      <Card>
        <Spinner animation="border" variant="primary" />
      </Card>
    )
  }

  if (taskListQuery.isError) {
    return (
      <Card>
        <h6 className="m-3">Error: Tasks could not be retrieved.</h6>
      </Card>
    )
  }

  const activeTaskList = () => {
    return (
      <div className="m-3">
        <h5>{board?.title}</h5>
        {taskListQuery.data?.data.tasks.length === 0 && (
          <p className="mt-3 mb-3">
            <i>No tasks found. Create a new task.</i>
          </p>
        )}
        {taskListQuery.data?.data.tasks.map((task: ViewModels.Task) => {
          return <Task key={task.taskId} task={task} changeTaskStatusMutation={changeTaskStatusMutation}></Task>
        })}
        {!showTaskInput && (
          <Button
            onClick={() => {
              setShowTaskInput(true)
            }}
            variant="outline-primary"
          >
            Create New Task
          </Button>
        )}
        {showTaskInput && (
          <CreateTaskInput
            setShowTaskInput={setShowTaskInput}
            createTaskMutation={createTaskMutation}
          ></CreateTaskInput>
        )}
      </div>
    )
  }

  return <Card className="flex-grow-1 me-3">{activeTaskList()}</Card>
}

export default TaskList
