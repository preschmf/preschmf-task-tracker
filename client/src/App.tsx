import React from 'react'
import Tracker from '../components/Tracker'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const backGroundStyle = {
  background: 'linear-gradient(to top right,rgb(205, 234, 255),rgb(243, 247, 251))',
  minHeight: '100vh',
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={backGroundStyle}>
        <Tracker />
      </div>
    </QueryClientProvider>
  )
}

export default App
