import { Outlet } from 'react-router-dom';
// import AdminSidebar from '../components/adminComponents/AdminSidebar';
import Nav from '../components/adminComponents/Nav';
import ExecutiveSidebar from '../components/executiveComponents/ExecutiveSidebar';
import ExecutiveNav from '../components/executiveComponents/ExecutiveNav';


function ExecutiveLayout() {
  return (
    <div className=" h-screen bg-gray-50 md:grid md:grid-cols-[1fr,11fr]  lg:grid lg:grid-cols-[1fr,10fr]">
    <ExecutiveSidebar className="  p-4" /> 
    <div className="flex flex-col h-screen bg-slate-6">  
      <ExecutiveNav className="bg-white shadow-sm " />
      <div className="flex-grow overflow-y-auto h-screen scrollbar-hidden border-[1px] border-[#E6EFF5] bg-[#F5F7FA] ml-   mt-    p-4    "> 
        <Outlet />
      </div>
    </div>
  </div>
  );
}

export default ExecutiveLayout;
