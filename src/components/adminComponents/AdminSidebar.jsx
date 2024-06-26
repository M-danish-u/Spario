import React, { useState } from "react";
import { IoIosSettings, IoMdHome } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GrTransaction } from "react-icons/gr";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { PiStorefrontBold } from "react-icons/pi";
import { FaRoute } from "react-icons/fa";


const AdminSidebar = () => {
  const SidebarData = [
    { name: "Dashboard", icon: IoMdHome, path: "/admin/dashboard" },
    { name: "Store", icon: PiStorefrontBold, path: "/admin/store" },
    { name: "Executive", icon: IoPersonSharp, path: "/admin/executive" },
    { name: "Transactions", icon: GrTransaction, path: "/admin/transactions" },
    { name: "Route", icon: FaRoute, path: "/admin/route" },
    { name: "Return", icon: GiReturnArrow, path: "/admin/returns" },
    { name: "Expenses", icon: FaRegMoneyBillAlt, path: "/admin/expense" },
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
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="h-[100vh] hidden md:block bg-re-400">
      <div className="h-[85px] w-full bg-slate-5 flex items-center justify-center text-[40px] font-extrabold text-[#C91818]">
        SPARIO
      </div>
      <div
        className="mt-4 flex flex-col mb-6 justify-betwee b-slate-400"
        style={{ height: "calc(100vh - 85px)" }}
      >
        <div>
          {SidebarData?.map((data, i) => {
            const Icon = data.icon;
            const itemColor = location.pathname.includes(data.path)
              ? "text-[#C91818]"
              : "text-[#414040]";
            return (
              <div
                className={`flex items-center w-full b-red-400 px-8 gap-8 py-4 ${itemColor}`}
                onClick={() => {
                  navigate(data.path);
                  // window.location.reload();
                }}
                key={i}
              >
                <Icon className={`text-[20px] ${itemColor}`} />
                <p className={`text-[18px] cursor-pointer`}>{data.name}</p>
              </div>
            );
          })}
        </div>
        <div
          className=" flex items-center   py-3 px-8  bottom-4 cursor-pointer gap-8   bg-yellow-"
          onClick={() => setShowLogoutPopup(true)}
        >
          <FaPowerOff className="text-[#C91818] text-[20px]" />
          <p className="text-[#414040] text-[18px]"> Logout</p>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 mr-4 bg-blue-500 text-white rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
