import React from 'react'
import AdminRout from './AdminRout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ExecutivePortalRoute from './ExecutiveRoute'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../Auth/Login'

const MainRoute = () => {
  return (
    <div className=''>
        <BrowserRouter>
        <Routes>
        <Route path="/"  element={<HomePage/>} />
        <Route path="/login"  element={<Login/>} />

        </Routes>
        <AdminRout/>
        <ExecutivePortalRoute/>
        </BrowserRouter>
        
    </div>
  )
}

export default MainRoute