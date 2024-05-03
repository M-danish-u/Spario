import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import Nav from '../components/adminComponents/Nav';


function AdminLayout() {
  return (
    <div className=" h-screen bg-gray-50 md:grid md:grid-cols-[1fr,11fr]  lg:grid lg:grid-cols-[1fr,10fr]">
    <AdminSidebar className="  p-4" /> 
    <div className="flex flex-col h-screen bg-slate-6">  
      <Nav className="bg-white shadow-m " />
      <div className="flex-grow overflow-y-auto h-screen scrollbar-hidden border-[1px] border-[#E6EFF5] bg-[#F5F7FA] ml-   mt-    p-4   "> 
        <Outlet />
      </div>
      
    </div>
  </div>
  );
}

export default AdminLayout;
