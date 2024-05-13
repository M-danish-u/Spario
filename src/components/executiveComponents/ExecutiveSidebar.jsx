import React, { useState } from 'react';
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { GiReturnArrow } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiStorefrontBold } from "react-icons/pi";


const ExecutiveSidebar = () => {

  const SidebarData = [
    {name: "Dashboard", icon: IoMdHome, path: "/executive/dashboard"},
    {name: "Store", icon: PiStorefrontBold, path: "/executive/store"},
    {name: "Transactions", icon: GrTransaction, path: "/executive/transactions"},
    {name: "Invoices", icon: LiaFileInvoiceSolid, path: "/executive/invoices"},
    {name: "Return", icon: GiReturnArrow, path: "/executive/return"},
    {name: "Expenses", icon: FaRegMoneyBillAlt, path: "/executive/expenses"},
     ]
  
     const navigate = useNavigate()
  const location = useLocation();

  console.log(location.pathname.slice(1),"Debugging the location please be careful")
  const defaultColor = "text-[#414040]"; // Default color
  const activeColor = "text-[#C91818]"; // Active color when pathname matches
  const isActive = (path) => location.pathname.includes(path)


  const [selectedItem, setSelectedItem] = useState(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for showing/hiding logout confirmation popup



  const handleItemClick = (item) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className='h-[100vh] md:block hidden bg-red-4' >
      <div className='h-[85px] w-full bg-slate-5 flex items-center justify-center text-[40px] font-extrabold text-[#C91818]' >SPARIO</div>
      <div className='mt-4 bg-slate- flex flex-col justify-betwee' style={{ height: 'calc(100vh - 85px)', }}>
<div>
      {SidebarData.map((data, i) => {
          const Icon = data.icon; 
          const itemColor = isActive(data.path) ? activeColor : defaultColor;
          return(
          //   <div onClick={() => navigate(data.path)} key={i} className={`flex gap-3 mb-4 items-center cursor-pointer font-medium group ${itemColor} `}>
          //   <Icon className={`w-5 h-5 group-hover:text-gray-300 ${itemColor}`} />
          //   <div className="group-hover:text-gray-300">{data.name}</div>
          // </div>
          
          <div className={`flex items-center w-full px-8 bg-red- gap-8  py-4 ${itemColor}`} onClick={() => navigate(data.path)} key={i}>
          <Icon className={`text-[20px] ${itemColor}`} />
          <p className={`text-[18px] cursor-pointer`}>{data.name}</p>
        </div>
          );
        })}
</div>
        {showLogoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center mt-4">
              <button className="px-4 py-2 mr-4 bg-blue-500 text-white rounded" onClick={handleLogout}>Logout</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
              <div className=' flex items-center  py-3 px-8  bottom-4 cursor-pointer gap-8   bg-yellow-' onClick={() => setShowLogoutPopup(true)}><FaPowerOff className='text-[#C91818] text-[20px]' />
             <p className='text-[#414040] text-[18px]'> Logout</p></div>

      </div>
    </div>
  );
}

export default ExecutiveSidebar;
