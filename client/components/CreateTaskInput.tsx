import React, { useState, ChangeEvent } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateTaskInput = ({ setShowTaskInput, createTaskMutation }) => {
  const [newTaskName, setNewTaskName] = useState<string>('')
  const [inputAlert, setInputAlert] = useState<string>('')
  const [inputMessage, setInputMessage] = useState<string>('')

  const handleSubmitClick = async () => {
    if (newTaskName) {
      setInputAlert('')
      setInputMessage('')
      createTaskMutation.mutate(newTaskName)
    } else {
      setInputAlert('error')
      setInputMessage('Please enter a name for the task')
    }
  }

  const handleCancelClick = () => {
    setShowTaskInput(false)
    setNewTaskName('')
  }

  const handleTaskInputChange = (e: ChangeEvent<HTMLInputElement>) => setNewTaskName(e.target.value)

  return (
    <>
      <Form.Label htmlFor="inputTaskName">New Task</Form.Label>
      <Form.Control
        className="mb-3"
        type="text"
        placeholder="Enter new task"
        onChange={handleTaskInputChange}
      ></Form.Control>
      <Button disabled={!newTaskName ? true : false} onClick={handleSubmitClick} variant="primary" className="me-1">
        Submit
      </Button>
      <Button onClick={handleCancelClick} variant="outline-danger">
        Cancel
      </Button>
    </>
  )
}
export default CreateTaskInput
