import { useState } from "react";
import Switch from "@mui/material/Switch";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { IoIosClose } from "react-icons/io";
import { FaCheck , } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
export const AdminExpenseCollumn = (handleStatus,handleStatusApprove) => {
  const handleStatusChange = (row) => {
    // Implement your logic to update the status here
    console.log("Status changed for executive:", row.executiveName);
  };

  return [
    {
      Header: "No",
      accessor: "id",
      Cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      Header: "Executive Name",
      accessor: "executive.name",
    },
    {
      Header: "Store Name",
      accessor: "store.store_name",
    },
    {
        Header: "Expense",
        accessor: "description",
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: ({ row }) => (
          <div className="flex flex-row items-center justify-cente ">
            <LiaRupeeSignSolid /> {row.original.amount} {/* Add the Rupee icon */}
          </div>
        ),
      },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => {
        const { status } = row.original;
      
        if (status === "pending") {
          return (
            < div className="flex gap-4">
              <FaCheck className=" text-3xl bg-green-600 text-white w-12 h-8 cursor-pointer rounded-[4px]" onClick={() => handleStatusApprove(row.original)} />
             
              <IoClose className="text-3xl bg-red-600 text-white w-12 h-8 cursor-pointer rounded-[4px]" onClick={() => handleStatus(row.original)} />
              
            
            </div>
          );
        } else if (status === "approved") {
          return (
            <span className="text-green-500">
              Approved
            </span>
          );
        } else if (status === "rejected") {
          return (
            <span className="text-red-500">
              Rejected
            </span>
          );
        } else {
          return null; // Handle other status values if needed
        }
      },
      
      
    },
    // {
    //   Header: "Actions",
    //   accessor: "actions",
    //   Cell: ({ row }) => (
    //     <div className="flex  space-x-4">
    //       <button
    //         onClick={() => handleViewExecutive(row.original)}
    //         className="text-[#B1B1B1] text-xl mr-4"
    //       >
    //         <FaRegEye />
    //       </button>
    //       <button
    //         onClick={() => handleEdit(row.original)}
    //         className="text-[#B1B1B1]  text-xl"
    //       >
    //         <FaRegEdit />
    //       </button>
    //     </div>
    //   ),
    // },
  ];
};
