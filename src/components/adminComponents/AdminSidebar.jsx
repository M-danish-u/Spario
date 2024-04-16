import React, { useState } from 'react';
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";


const AdminSidebar = () => {

  const SidebarData = [
    { name: "Dashboard", icon: IoMdHome, path: "/admin/dashboard" },
    { name: "Store", icon: FaFileInvoiceDollar, path: "/admin/store" },
    { name: "Executive", icon: IoPersonSharp, path: "/admin/executive" },
    { name: "Transactions", icon: GrTransaction, path: "/admin/transactions" },
    { name: "Route", icon: IoIosSettings, path: "/admin/route" },

     ]
  
     const navigate = useNavigate()
  const location = useLocation();

  console.log(location.pathname.slice(1),"Debugging the location please be careful")
  const defaultColor = "text-[#B1B1B1]"; // Default color
  const activeColor = "text-[#C91818]"; // Active color when pathname matches
  const isActive = (path) => location.pathname.includes(path)


  const [selectedItem, setSelectedItem] = useState(null);


  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  return (
    <div className='h-[100vh] bg-red-4' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className='h-[85px] w-full bg-slate-5 flex items-center justify-center text-[2.5rem] font-semibold text-[#C91818]' >SPARIO</div>
      <div className='mt-4' style={{ height: 'calc(100vh - 85px)', }}>

      {SidebarData.map((data, i) => {
          const Icon = data.icon; 
          const itemColor = isActive(data.path) ? activeColor : defaultColor;
          return(
          //   <div onClick={() => navigate(data.path)} key={i} className={`flex gap-3 mb-4 items-center cursor-pointer font-medium group ${itemColor} `}>
          //   <Icon className={`w-5 h-5 group-hover:text-gray-300 ${itemColor}`} />
          //   <div className="group-hover:text-gray-300">{data.name}</div>
          // </div>
          
          <div className={`flex items-center w-full px-8  gap-8  py-4 ${itemColor}`} onClick={() => navigate(data.path)} key={i}>
          <Icon className={`text-3xl ${itemColor}`} />
          <p className={`text-2xl '}`}>{data.name} </p>
        </div>
          );
        })}
        
      </div>
    </div>
  );
}

export default AdminSidebar;
