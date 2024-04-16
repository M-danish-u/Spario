import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/adminComponents/AdminSidebar';
import Nav from '../components/commonComponents/Nav';


function AdminLayout() {
  return (
    <div className=" h-screen bg-gray-50   grid grid-cols-[2fr,10fr]">
    <AdminSidebar className="  p-4" /> 
    <div className="flex flex-col h-screen">  
      <Nav className="bg-white shadow-md " />
      <div className="flex-grow overflow-y-auto scrollbar-hidden bg-[#F5F7FA] ml-2   mt-5    p-5   "> 
        <Outlet />
      </div>
    </div>
  </div>
  );
}

export default AdminLayout;
