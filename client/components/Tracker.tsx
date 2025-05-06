import taskTrackerApi from '../src/utils/taskTrackerApi'
import { useQuery, useMutation } from 'react-query'
import React, { useEffect, useState } from 'react'
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
      return taskTrackerApi.get('/api/v1/board')
    },
    refetchOnWindowFocus: false,
  })

  const deleteBoardMutation = useMutation({
    mutationFn: () => {
      return taskTrackerApi.delete(`/api/v1/board/${selectedBoard?.boardId}`)
    },
  })

  const createBoardMutation = useMutation({
    mutationFn: (title: string) => {
      return taskTrackerApi.post('/api/v1/board', {
        title,
      })
    },
  })

  useEffect(() => {
    boardListQuery.refetch()
  }, [deleteBoardMutation.isSuccess, createBoardMutation.isSuccess])

  useEffect(() => {
    if (boardListQuery.data?.data.boards.length > 0) {
      setSelectedBoard(boardListQuery.data?.data.boards[0])
    } else {
      setSelectedBoard(undefined)
    }
  }, [deleteBoardMutation.isSuccess, boardListQuery.isSuccess])

  const onDeleteBoardClick = async () => {
    deleteBoardMutation.mutate()
  }

  const logOut = async () => {
    try {
      const response = await taskTrackerApi.get('/api/v1/logout')
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
          <Button className="col-12 mt-3" variant="danger" onClick={onDeleteBoardClick}>
            {deleteBoardMutation.isLoading ? 'Deleting Board...' : 'Delete Board'}
          </Button>
          <CreateBoardModal
            open={isCreateBoardModalOpen}
            createBoardMutation={createBoardMutation}
            onClose={() => setIsCreateBoardModalOpen(false)}
          />
        </div>
        {selectedBoard && <TaskList board={selectedBoard} />}
      </div>
    </>
  )
}

export default Tracker
