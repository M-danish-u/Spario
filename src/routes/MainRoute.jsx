import React from 'react'
import AdminRout from './AdminRout'
import { BrowserRouter } from 'react-router-dom'
import ExecutivePortalRoute from './ExecutiveRoute'

const MainRoute = () => {
  return (
    <div>
        <BrowserRouter>
        <AdminRout/>
        <ExecutivePortalRoute/>
        </BrowserRouter>
        
    </div>
  )
}

export default MainRoute