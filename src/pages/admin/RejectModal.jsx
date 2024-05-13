import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";

import 'react-toastify/dist/ReactToastify.css';
import { expenseStatusReject } from "../../redux/featuer/admin/AdminSlice";



const RejectModal = ({ onClose , reject}) => {
  
    const dispatch=useDispatch()

    const handleStatus = async () => {
            console.log(reject,'expens');
            if (!reject || !reject.id) {
                console.error('Invalid executive object or ID');
                return;
            }
    
            try {
                await dispatch(expenseStatusReject(reject.id));
                window.location.reload(); 
            } catch (error) {
                console.error('Error changing executive status:', error);
            }
        };
    


  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/70">
     
      <div className="bg-slate-100 border flex-row py-4 rounded-xl px-8  b-slate-700 g-white relative">
        
          {/* <div className=" b-red-500 flex justify-end " >
            <button onClick={onClose}>
              <IoClose className="" size={24} />
            </button>
          </div> */}
          <p className="mt-4 text-black"> Are you sure? Do you want to reject this this expense</p>
          <div className="b-red-500 flex items-center justify-center gap-4 mt-4">
            <button className=" bg-blue-500 text-xl text-white px-4 py-1 rounded-md" onClick={handleStatus}>Reject</button>
            <button className=" bg-slate-500 text-xl text-white px-4 py-1 rounded-md" onClick={onClose}>Cancel</button>
          </div>
      </div>
    </div>
  );
};

export default RejectModal;
