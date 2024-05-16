import React from 'react'
import AdminRout from './AdminRout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ExecutivePortalRoute from './ExecutiveRoute'
import HomePage from '../pages/HomePage/HomePage'
import Login from '../Auth/Login'
import { jwtDecode } from 'jwt-decode'

const MainRoute = () => {
  return (
    <div className=''>
        <BrowserRouter>
        <Routes>
        <Route path="/"  element={<HomePage/>} />

        <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
        </Routes>
        <AdminRout/>
        <ExecutivePortalRoute/>
        </BrowserRouter>
        
    </div>
  )
}

export default MainRoute

const RedirectIfAuthenticated = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log("rwsiewrwsdlkasflalsfajsk",token)
  
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if(decoded.role=== 'admin'){
   console.log(" decoddddddddde",decoded)
        return <Navigate to="/admin/dashboard" replace />;
      }else if(decoded.role==='executive'){
        return <Navigate to="/executive/dashboard" replace />;

      }
      else{
        localStorage.removeItem('token')
        return <Navigate to="/login" replace />;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  return children; 
};