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
      return axios.get('/api/v1/board')
    },
    refetchOnWindowFocus: false,
  })

  const onBoardCreated = (board: ViewModels.Board) => {
    boardListQuery.refetch()
    setSelectedBoard(board)
  }

  return (
    <>
      <img src="/boards.png" alt="Boards" className="m-3" />
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
