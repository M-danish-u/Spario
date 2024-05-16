import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const ExecutiveStoreCollumn = (handleViewStore, handleAddAmount,handleEdit) => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    Header: "Store Name",
    accessor: "store_name",
  },
  {
    Header: " Customer Name  ",
    accessor: "customer_name",
  },
  {
    Header: " Total  ",
    accessor: "total_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
        <LiaRupeeSignSolid /> {row.original.total_amount} {/* Add the Rupee icon */}
      </div>
    ),
  },
  {
    Header: " Due  ",
    accessor: "balance_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <LiaRupeeSignSolid className="text-red-600" />{" "}
        <span style={{ color: row.original.balance_amount > -1 ? "red" : "inherit" }}>
          {row.original.balance_amount}
        </span>
      </div>
    ),
  },
  {
    Header: " Paid  ",
    accessor: "paidAmount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center">
        <LiaRupeeSignSolid className="text-green-700" />{" "}
        <span style={{ color: row.original.paidAmount > -1 ? "green" : "inherit" }}>
          {row.original.paidAmount}
        </span>
      </div>
    ),
  },
  {
    Header: 'Add Amount',
    accessor: "amount",
    Cell: ({ row }) => (
      <button
        onClick={() => handleAddAmount(row.original)}
        className={`text-white p-2 rounded-md ${
          row.original.balance_amount < 1 ? "bg-gray-400" : "bg-green-500"
        }`}
        disabled={row.original.balance_amount < 1}
      >
      {row.original.balance_amount < 1 ? "No Amount " : "Add Amount"}
      </button>
    ),
  },
  {
    Header: "Actions",
    accessor: "actions",
    Cell: ({ row }) => (
      <div className="flex flex-row space-x-2">
         <button
          onClick={() => handleViewStore(row.original)}
          className="text-[#B1B1B1] text-xl  cursor-pointer mr-4"
        >
          <FaEye />
        </button>
        <button
          onClick={() => handleEdit(row.original)}
          className="text-[#B1B1B1] cursor-pointer text-xl " // Added mr-2 for right margin
        >
          <FaRegEdit />
        </button>
       
      </div>
    ),
  },
  // Other columns...
];
