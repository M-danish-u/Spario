import React, { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { LuBellDot } from "react-icons/lu";
import profile from "../../assets/profile.webp";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { TiTimes } from "react-icons/ti";
import { FaPowerOff } from "react-icons/fa";

const ExecutiveNav = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false); // State for showing/hiding logout confirmation popup

  const navigate=useNavigate()

  const handleMenuToggle = () => {
    setMenuToggle(!menuToggle);
    console.log("ddddddddddddd");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const location = useLocation();
  const pathname = location.pathname;

  const route = (pathname) => {
    if (pathname === "/admin/dashboard") {
      return "Dashboard";
    } else if (pathname === "/admin/store") {
      return "Store";
    } else if (pathname === "/admin/executive") {
      return "Executive";
    } else if (pathname === "/admin/transactions") {
      return "Transactions";
    } else if (pathname === "/admin/route") {
      return "Route";
    } else if (pathname === "/executive/dashboard") {
      return "Dashboard";
    } else if (pathname === "/executive/store") {
      return "Store";
    } else if (pathname === "/executive/transactions") {
      return "Transactions";
    } else if (pathname === "/admin/routeprofile") {
      return "Route";
    } else if (pathname === "/admin/routestoreprofile") {
      return "Route";
    } else if (pathname === "/executive/storeprofile") {
      return "Store";
    }
    else if (pathname === "/executive/invoices") {
      return "Invoices";
    }
    else if (pathname === "/executive/expenses") {
      return "Expenses";
    }
    else if (pathname === "/executive/return") {
      return "Return";
    }
    else {
      return ""; // Default value if none of the conditions match
    }
  };

  return (
    <div className="w-full h-[110px] shadow- px-4 md:px-8 bg-yellow-40 border-l-[1px] border-[#E6EFF5]">
      <div className="flex items-center h-full justify-between">
        <h2 className="md:text-[28px] text-[24px] font-semibold hidden md:block text-[#343C6A]">
          {route(pathname)}
        </h2>
        <h2 className="md:text-[28px] text-[#C91818] text-[24px] font-semibold  md:hidden ]">
          SPARIO
        </h2>
        <div className="flex flex-row items-center gap-7">
          {/* <CiSettings className='md:text-3xl text-2xl text-[#718EBF]' /> */}
          {/* <LuBellDot className="md:text-3xl text-2xl text-[#FD5373]" /> */}
          {/* <img
            className="w-10 hidden md:block h-10 rounded-full"
            src={profile}
            alt="Profile"
          /> */}
          <IoIosMenu
            className="text-3xl md:hidden text-[#343C6A]"
            onClick={handleMenuToggle}
          />
        </div>
        <div
          className={`fixed right-0 top-[40px]  bg-[#ffffff] transition-transform md:hidden z-50 ease-in-out duration-300 transform ${
            menuToggle ? "translate-y-[0px]" : "translate-y-[-450px]"
          } lg:translate-y-full`}
        >
          <TiTimes
            className=" text-2xl text-[#343C6A] cursor-pointer ml-32 mt-4  absolute top-0 right-4"
            onClick={handleMenuToggle}
          />
          <ul className="flex flex-col items-cente  justify-center px-16 h-full p-4">
            <li className="text-[#343C6A] cursor-pointer  border-b-2 my-4 b-red-400 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/dashboard">Dashboard</Link>
            </li>
            <li className="text-[#343C6A] cursor-pointer border-b-2 my-4 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/store">Stores</Link>
            </li>
            
            
            <li className="text-[#343C6A] cursor-pointer border-b-2 my-4 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/transactions">Transactions</Link>
            </li>
            <li className="text-[#343C6A] cursor-pointer border-b-2 my-4 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/invoices">Invoices</Link>
            </li>

            <li className="text-[#343C6A] cursor-pointer border-b-2 my-4 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/return">Return</Link>
            </li>
            <li className="text-[#343C6A] cursor-pointer border-b-2 my-4 border-transparent hover:border-[#343C6A] focus:border-[#343C6A] transition-all duration-300" onClick={handleMenuToggle}>
              <Link to="/executive/expenses">Expenses</Link>
            </li>
            

            <div
          className=" flex items-center  mt-3  px-  bottom-4 cursor-pointer gap-4   g-yellow-300"
          onClick={() => {
            setShowLogoutPopup(true);
            handleMenuToggle();
          }}
          
        >
          <FaPowerOff className="text-[#C91818] text-l" />
          <p className="text-[#343C6A] text-l"> Logout</p>
        </div>
          </ul>

          
        </div>
      </div>
        {/* Logout Confirmation Popup */}
        {showLogoutPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to logout?</p>
            <div className="flex justify-end mt-4">
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

export default ExecutiveNav;
