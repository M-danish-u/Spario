import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const ExpenseExecutiveCollumn = () => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    Header: "Store Name",
    accessor: "store.store_name",
  },
  {
    Header: "Expenses",
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
          <span className="text-yellow-600  px-4 py-1 rounded-md">
            Pending
          </span>
        );
        
      } else if (status === "approved") {
        return (
          <span className="text-green-600  px-4 py-1 rounded-md">
            Approved
          </span>
        );
      } else if (status === "rejected") {
        return (
          <span className="text-red-600  px-4 py-1 rounded-md">
            Rejected
          </span>
        );
      } else {
        return null; // Handle other status values if needed
      }
    },
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
