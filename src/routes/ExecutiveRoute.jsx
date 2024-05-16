import React from 'react'
import { Route, Routes } from "react-router-dom"

import ExecutiveLayout from '../layout/ExicutiveLayout'
import ExecutiveDashboard from '../pages/executive/ExecutiveDashboard'
import Store from '../pages/executive/Store'
import ExecutiveStoreProfile from '../pages/executive/StoreProfile'
import ExecutiveTransactions from '../pages/executive/Transactions'
import ExecutiveLogin from '../pages/executive/ExecutiveLogin'
import Invoices from '../pages/executive/Invoices'
import Return from '../pages/executive/Return'
import ExpensesExecutive from '../pages/executive/ExpensesExecutive'
import ProtectedRoute from './ProtectedRoute'


const ExecutivePortalRoute = () => {
    return (
      <div>  
         <Routes> 
         {/* <Route path="executive/login" element={<ExecutiveLogin/>}></Route> */}

         <Route element={<ProtectedRoute requiredRole="executive" />}>

      <Route path='/executive' element={<ExecutiveLayout />}>
    
       <Route index element={<ExecutiveDashboard />} />
       <Route path="/executive/dashboard" element={<ExecutiveDashboard />} />
       <Route path="/executive/store" element={<Store/>} />
       <Route path='/executive/storeprofile' element={<ExecutiveStoreProfile/>}/>
       {/* <Route path="/admin/executive" element={<Executive/>} /> */}
       {/* <Route path='/admin/executiveprofile' element={<ExicutiveProfile/>}/> */}
       {/* <Route path="/admin/route" element={<Rooute/>} /> */}
       {/* <Route path='/admin/routeprofile' element={<RouteProfile/>}/> */}
       <Route path="/executive/transactions" element={<ExecutiveTransactions/>} /> 
       <Route path="/executive/invoices" element={<Invoices/>} /> 
       <Route path="/executive/return" element={<Return/>} /> 
       <Route path="/executive/expenses" element={<ExpensesExecutive/>} /> 






</Route>
     </Route>
   </Routes> 
</div>
    )
  }
  
  export default ExecutivePortalRoute