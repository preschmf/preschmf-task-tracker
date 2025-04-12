import React, { useState, useEffect, ChangeEvent } from 'react'
import Form from 'react-bootstrap/Form'
import { ViewModels } from '../../shared/src/view-model'

const Task = ({ task, changeTaskStatusMutation }) => {
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false)

  const handleTaskClick = async () => {
    changeTaskStatusMutation.mutate(task)
  }

  return (
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
  )
}

export default Task
