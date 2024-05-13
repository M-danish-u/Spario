import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const TransactionsCollumn = (handleViewStore, handleEdit) => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    Header: "Executive",
    accessor: "executive.name",
  },
  {
    Header: " Store  ",
    accessor: "store.store_name",
  },

  {
    Header: " Received  ",
    accessor: "amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.amount} {/* Add the Rupee icon */}
      </div>
    ),
  },
  
  {
    Header: "Payment Method",
    accessor: "payment_method",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente">
        <span>{row.original.payment_method}</span>
        <span className="mx-2"> </span> {/* Separator between Payment Method and Reference No */}
        <span>{row.original.reference_no}</span> {/* Displaying Reference No */}
      </div>
    ),
  },
 

  {
    Header: "Date",
    accessor: "created_at",
    Cell: ({ row }) => {
      // Parse the created_at string into a Date object
      const date = new Date(row.original.created_at);
      
      // Extract day, month, and year components
      const day = date.getDate();
      const month = date.getMonth() + 1; // Month is zero-based, so add 1
      const year = date.getFullYear();

      // Format into dd/mm/yyyy format
      const formattedDate = `${day}/${month}/${year}`;

      return <span>{formattedDate}</span>;
    },
  },



 
];

