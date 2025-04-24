import axios from 'axios'

const taskTrackerApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:8080',
  withCredentials: true,
})

export default taskTrackerApi
