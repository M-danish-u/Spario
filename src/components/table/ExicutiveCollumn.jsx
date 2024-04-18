import { useState } from "react";
import Switch from "@mui/material/Switch";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRegEdit } from "react-icons/fa";

export const ExecutiveCollumn = (handleViewExecutive, handleEdit) => {
  const handleStatusChange = (row) => {
    // Implement your logic to update the status here
    console.log("Status changed for executive:", row.executiveName);
  };

  return [
    {
      Header: "No",
      accessor: "id",
    },
    {
      Header: "Executive Name",
      accessor: "name",
    },
    {
      Header: "No. of Stores",
      accessor: "numOfStore",
    },
    {
      Header: "Total Amount",
      accessor: "totalAmount",
      Cell: ({ row }) => (
        <div className="flex flex-row items-center ">
          <LiaRupeeSignSolid /> {row.original.totalAmount} {/* Add the Rupee icon */}
        </div>
      ),
    },
    {
      Header: "Due Amount",
      accessor: "dueAmount",
      Cell: ({ row }) => (
        <div className="flex flex-row items-center">
          <LiaRupeeSignSolid className="text-red-600" />{" "}
          <span style={{ color: row.original.dueAmount > 0 ? "red" : "inherit" }}>
            {row.original.dueAmount}
          </span>
        </div>
      ),
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <Switch className=""
          checked={row.original.active_status === "1"}
          onChange={() => handleStatusChange(row.original)}
        />
      ),
    },
    {
      accessor: "viewprofile",
      Cell: ({ row }) => (
        <button
          onClick={() => handleViewExecutive(row.original)}
          className="text-[#2723F4]"
        >
          View Executive
        </button>
      ),
    },
    {
      accessor: "edit",
      Cell: ({ row }) => (
        <button
          onClick={() => handleEdit(row.original)}
          className="text-[#B1B1B1] text-xl"
        >
          <FaRegEdit />
        </button>
      ),
    },
  ];
};
