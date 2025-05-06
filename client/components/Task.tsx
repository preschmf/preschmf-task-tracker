import React from 'react'
import Form from 'react-bootstrap/Form'
import taskTrackerApi from '../src/utils/taskTrackerApi'
import { Spinner } from 'react-bootstrap'
import { ViewModels } from '../../shared/src/view-model'
import { useState } from 'react'

const deleteTask = async (taskId: string) => {
  await taskTrackerApi.delete(`/api/v1/task/${taskId}`)
}

const Task = ({ task, changeTaskStatusMutation, deleteTaskMutation }) => {
  const onDeleteTaskClick = async () => {
    deleteTaskMutation.mutate(task)
  }

  const handleTaskClick = async () => {
    changeTaskStatusMutation.mutate(task)
  }

  return (
    <div className="d-flex flex-row">
      <Form className="mb-3 mt-3">
        <Form.Check
          type="checkbox"
          id={task.taskId}
          label={task.title}
          checked={task.status === ViewModels.TaskStatus.complete ? true : false}
          onClick={handleTaskClick}
          readOnly
        />
      </Form>
      {task.status === ViewModels.TaskStatus.complete &&
        (deleteTaskMutation.isLoading ? (
          <Spinner
            className="mt-auto mb-auto ms-3"
            animation="border"
            variant="danger"
            style={{ width: '24px', height: '24px' }}
          />
        ) : (
          <img
            className="mt-auto mb-auto ms-3"
            onClick={onDeleteTaskClick}
            src="/trash-can.svg"
            alt="Boards"
            style={{ width: '24px', height: '24px' }}
          />
        ))}
    </div>
  )
}

export default Task
