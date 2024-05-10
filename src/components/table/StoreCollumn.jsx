import { FaUser } from "react-icons/fa6";
import { FaUserClock, FaEye } from "react-icons/fa"; // Added FaEye icon
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const StoreCollumn = (handleViewStore, handleEdit) => [
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
    Header: "Customer Name",
    accessor: "customer_name",
  },
  {
    Header: "Executive",
    accessor: "executive.name",
  },
  {
    Header: "Total",
    accessor: "total_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente">
        <LiaRupeeSignSolid /> {row.original.total_amount}
      </div>
    ),
  },
  {
    Header: "Due",
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
];
