import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import { ViewModels } from '../../shared/src/view-model'

interface BoardListProps {
  isLoading: boolean
  isError: boolean
  boards: ViewModels.Board[]
  selectBoard: (value: ViewModels.Board) => void
  currentBoard?: ViewModels.Board
}

const BoardList = ({ isLoading, isError, boards, selectBoard, currentBoard }: BoardListProps) => {
  if (isLoading) {
    return <Spinner animation="border" variant="primary" />
  }

  if (isError) {
    return <h2>Error Loading Boards</h2>
  }

  return (
    <>
      <ListGroup>
        {boards.map((board: ViewModels.Board) => {
          const isSelected = board.boardId === currentBoard?.boardId
          return (
            <ListGroup.Item onClick={() => selectBoard(board)} key={board.boardId} active={isSelected ? true : false}>
              {board.title}
            </ListGroup.Item>
          )
        })}
      </ListGroup>
    </>
  )
}

export default BoardList
