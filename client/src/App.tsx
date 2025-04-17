import React, { useEffect, useState } from 'react'
import Tracker from '../components/Tracker'
import LogInPage from '../components/LoginPage'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'

const queryClient = new QueryClient()

const backGroundStyle = {
  background: 'linear-gradient(to top right,rgb(205, 234, 255),rgb(243, 247, 251))',
  minHeight: '100vh',
}

const App = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get('/api/v1/login/success', {
        method: 'GET',
        withCredentials: true,
      })
      const data = response.data
      console.log(data)
      setUser(data.user)
    }
    getUser()
  }, [])
  return (
    <QueryClientProvider client={queryClient}>
      <div style={backGroundStyle}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Tracker />} />
            <Route path="/login" element={user ? <Navigate to="/" /> : <LogInPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  )
}

export default App
