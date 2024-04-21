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
  ];

  const navigate = useNavigate();
  const location = useLocation();

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
    <div className='h-[100vh] bg-red-4' style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
      <div className='h-[85px] w-full bg-slate-5 flex items-center justify-center text-[2.5rem] font-semibold text-[#C91818]' >SPARIO</div>
      <div className='mt-4' style={{ height: 'calc(100vh - 85px)', }}>
        {SidebarData.map((data, i) => {
          const Icon = data.icon;
          const itemColor = location.pathname.includes(data.path) ? "text-[#C91818]" : "text-[#B1B1B1]";
          return (
            <div className={`flex items-center w-full px-8 gap-8 py-4 ${itemColor}`} onClick={() => navigate(data.path)} key={i}>
              <Icon className={`text-3xl ${itemColor}`} />
              <p className={`text-2xl`}>{data.name} </p>
            </div>
          );
        })}
        <p className='absolute bottom-4 cursor-pointer' onClick={() => setShowLogoutPopup(true)}>Logout</p>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 mr-4 bg-blue-500 text-white rounded" onClick={handleLogout}>Logout</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded" onClick={() => setShowLogoutPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
