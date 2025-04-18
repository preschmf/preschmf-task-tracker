import axios from 'axios'
import { useQuery } from 'react-query'
import React, { useState } from 'react'
import TaskList from './TaskList'
import BoardList from './BoardList'
import { ViewModels } from 'shared/src/view-model'
import Button from 'react-bootstrap/Button'
import { CreateBoardModal } from './CreateBoardModal'

const Tracker = () => {
  const [selectedBoard, setSelectedBoard] = useState<ViewModels.Board>()
  const [isCreateBoardModalOpen, setIsCreateBoardModalOpen] = useState<boolean>(false)

  const boardListQuery = useQuery('board-list', {
    queryFn: () => {
      return axios.get('/api/v1/board', { withCredentials: true })
    },
    refetchOnWindowFocus: false,
  })

  const onBoardCreated = (board: ViewModels.Board) => {
    boardListQuery.refetch()
    setSelectedBoard(board)
  }

  const logOut = async () => {
    try {
      const response = await axios.get('/api/v1/logout', { withCredentials: true })
      if (response.status === 200) {
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <img src="/boards.png" alt="Boards" className="m-3" />
        <Button className="me-3" variant="tertiary" onClick={logOut}>
          Log out
        </Button>
      </div>
      <div className="d-flex flex-row">
        <div className="col-3 mx-3">
          <BoardList
            isLoading={boardListQuery.isLoading}
            isError={boardListQuery.isError}
            boards={boardListQuery.data?.data.boards}
            selectBoard={setSelectedBoard}
            currentBoard={selectedBoard}
          />
          <Button className="col-12 mt-3" variant="primary" onClick={() => setIsCreateBoardModalOpen(true)}>
            Create Board
          </Button>
          <CreateBoardModal
            open={isCreateBoardModalOpen}
            onBoardCreated={onBoardCreated}
            onClose={() => setIsCreateBoardModalOpen(false)}
          />
        </div>
        {selectedBoard && <TaskList board={selectedBoard} />}
      </div>
    </>
  )
}

export default Tracker
