import React from 'react'
import Form from 'react-bootstrap/Form'
import { ViewModels } from '../../shared/src/view-model'

const Task = ({ task, changeTaskStatusMutation }) => {
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
      {task.status === ViewModels.TaskStatus.complete && (
        <img
          className="mt-auto mb-auto ms-3"
          src="/trash-can.svg"
          alt="Boards"
          style={{ width: '24px', height: '24px' }}
        />
      )}
    </div>
  )
}

export default Task
