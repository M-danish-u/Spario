import React from 'react'
import { Route, Routes } from "react-router-dom"
import AdminLayout from '../layout/AdminLayout'
import AdminDashboard from '../pages/admin/AdminDashboard'
import Store from '../pages/admin/Store'
import StoreProfile from '../pages/admin/StoreProfile'
import Executive from '../pages/admin/Executive'
import ExicutiveProfile from '../pages/admin/ExicutiveProfile'
import Rooute from '../pages/admin/Route'
import RouteProfile from '../pages/admin/RouteProfile'
import Transactions from '../pages/admin/Transactions'
import AdminLogin from '../pages/admin/AdminLogin'
import RouteStoreINvoices from '../pages/admin/RouteStoreINvoices'
import Return from '../pages/admin/Return'
import ExpenseListing from '../pages/admin/ExpenseListing'
// import AdminLogin from "../pages/adminPortal/authentication/AdminLogin";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import Login from '../Auth/Login'




const AdminPortalRoute = () => {
    return (
      <div>  
         <Routes> 
         {/* <Route path="admin/login" element={<AdminLogin/>}></Route> */}
         

    <Route element={<ProtectedRoute requiredRole="admin" />}>


  
      <Route path='/admin' element={<AdminLayout />}>
    
      <Route index element={<AdminDashboard />} />
       <Route path="/admin/dashboard" element={<AdminDashboard />} />
       <Route path="/admin/store" element={<Store/>} />
       <Route path='/admin/storeprofile' element={<StoreProfile/>}/>
       <Route path="/admin/executive" element={<Executive/>} />
       <Route path='/admin/executiveprofile' element={<ExicutiveProfile/>}/>
       <Route path="/admin/route" element={<Rooute/>} />
       <Route path='/admin/routeprofile' element={<RouteProfile/>}/>
       <Route path='/admin/routestoreprofile' element={<RouteStoreINvoices/>}/>

       <Route path="/admin/transactions" element={<Transactions/>} />
       <Route path="/admin/returns" element={<Return/>} />
       <Route path="/admin/expense" element={<ExpenseListing/>} />
     </Route>
     </Route>
   </Routes> 
</div>
    )
  }
  
  export default AdminPortalRoute