import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import StudentDetail from './pages/StudentDetail'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Login/>}/>
      <Route path="/register" element={< Register/>}/>
      <Route path="/dashboard" element={< Dashboard/>}/>
      <Route path="/StudentDetail" element={< StudentDetail/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App