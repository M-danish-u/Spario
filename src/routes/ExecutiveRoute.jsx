import React from 'react'
import { Route, Routes } from "react-router-dom"

import ExecutiveLayout from '../layout/ExicutiveLayout'


const ExecutivePortalRoute = () => {
    return (
      <div>  
         <Routes> 
  
      <Route path='/executive' element={<ExecutiveLayout />}>
    
      {/* <Route index element={<AdminDashboard />} />
       <Route path="/admin/dashboard" element={<AdminDashboard />} />
       <Route path="/admin/store" element={<Store/>} />
       <Route path='/admin/storeprofile' element={<StoreProfile/>}/>
       <Route path="/admin/executive" element={<Executive/>} />
       <Route path='/admin/executiveprofile' element={<ExicutiveProfile/>}/>
       <Route path="/admin/route" element={<Rooute/>} />
       <Route path='/admin/routeprofile' element={<RouteProfile/>}/>
       <Route path="/admin/transactions" element={<Transactions/>} /> */}






     </Route>
   </Routes> 
</div>
    )
  }
  
  export default ExecutivePortalRoute