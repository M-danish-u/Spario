import { useState } from "react";
import Switch from "@mui/material/Switch";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaRegEdit, FaRegEye } from "react-icons/fa";

export const ExecutiveCollumn = (handleViewExecutive, handleEdit, handleStatus) => {
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
      accessor: "name",
    },
    {
      Header: "No. of Stores",
      accessor: "stores_count",
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
          <span style={{ color: row.original.dueAmount > -1 ? "red" : "inherit" }}>
            {row.original.dueAmount}
          </span>
        </div>
      ),
    },

    {
      Header: "Status",
      accessor: "status",
      Cell: ({ row }) => (
        <Switch
          checked={row.original.active_status === "1"}
          onClick={() => handleStatus(row.original)}
        />
      ),
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex  space-x-4">
          <button
            onClick={() => handleViewExecutive(row.original)}
            className="text-[#B1B1B1] text-xl mr-4"
          >
            <FaRegEye />
          </button>
          <button
            onClick={() => handleEdit(row.original)}
            className="text-[#B1B1B1]  text-xl"
          >
            <FaRegEdit />
          </button>
        </div>
      ),
    },
  ];
};
