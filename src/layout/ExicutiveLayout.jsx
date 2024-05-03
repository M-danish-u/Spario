import { Outlet } from 'react-router-dom';
// import AdminSidebar from '../components/adminComponents/AdminSidebar';
import Nav from '../components/adminComponents/Nav';
import ExecutiveSidebar from '../components/executiveComponents/ExecutiveSidebar';
import ExecutiveNav from '../components/executiveComponents/ExecutiveNav';


function ExecutiveLayout() {
  return (
    <div className=" h-screen bg-gray-50 md:grid md:grid-cols-[1fr,11fr]   lg:grid lg:grid-cols-[2fr,10fr]">
    <ExecutiveSidebar className="  p-4" /> 
    <div className="flex flex-col h-screen">  
      <ExecutiveNav className="bg-white shadow-sm " />
      <div className="flex-grow overflow-y-auto scrollbar-hidden border-[1px] border-[#E6EFF5] bg-[#F5F7FA]     p-4   "> 
        <Outlet />
      </div>
   
    </div>
  </div>
  );
}

export default ExecutiveLayout;
