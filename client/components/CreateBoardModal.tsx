import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import taskTrackerApi from '../src/utils/taskTrackerApi'
import React, { useState } from 'react'
import { ViewModels } from 'shared/src/view-model'

interface CreateBoardModalProps {
  open: boolean
  onBoardCreated: (board: ViewModels.Board) => void
  onClose: () => void
}

export const CreateBoardModal = ({ open, onBoardCreated, onClose }: CreateBoardModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [isCreating, setIsCreating] = useState<boolean>(false)

  const onCreateClick = async () => {
    setIsCreating(true)
    const response = await createBoard(title)
    setIsCreating(false)
    onBoardCreated(response.board)
    onClose()
  }

  return (
    <Modal
      size="lg"
      centered
      id="modal-create-board"
      show={open}
      dialogtitle="Create Board"
      onShow={async () => {
        setTitle('')
        setIsCreating(false)
      }}
      className="d-inline-flex"
    >
      <div className="m-3">
        <Form.Label htmlFor="inputBoardName">Board Name</Form.Label>
        <Form.Control
          type="text"
          id="inputBoardName"
          value={title}
          disabled={isCreating}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
          className="mb-2"
        />
        <Button variant="primary" disabled={isCreating || !title} onClick={onCreateClick}>
          {isCreating && <Spinner animation="border" variant="primary" />}
          Create
        </Button>
        &nbsp;
        <Button variant="outline-danger" disabled={isCreating} onClick={() => onClose()}>
          {isCreating && <Spinner animation="border" variant="primary" />}
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

interface CreateBoardResponse {
  board: ViewModels.Board
}

const createBoard = async (title: string): Promise<CreateBoardResponse> => {
  const response = await taskTrackerApi.post('/api/v1/board', { title })
  return response.data
}
