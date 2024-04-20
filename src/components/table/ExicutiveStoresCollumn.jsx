import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const ExecutiveStoreCollumn = () => [
  {
    Header: "SL No",
    accessor: "id",
  },
  {
    Header: "Store Name",
    accessor: "store_name",
  },
  {
    Header: " Total  ",
    accessor: "total_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.total_amount} {/* Add the Rupee icon */}
      </div>
    ),
  },
  {
    Header: " Paid  ",
    accessor: "paidAmount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.paidAmount} {/* Add the Rupee icon */}
      </div>
    ),
  },

  
  {
    Header: " Due  ",
    accessor: "balance_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
        <LiaRupeeSignSolid className="text-red-600" />{" "}
        <span style={{ color: row.original.balance_amount > -1 ? "red" : "inherit" }}>
          {row.original.balance_amount}
        </span>
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

  // {
  //   Header: 'Delete',
  //   accessor: 'delete',
  //   Cell: ({ row }) => (
  //     <button
  //     //   onClick={() =>handleDelete (row.original)}
  //       className=""
  //     >
  //       Delete
  //     </button>
  //   ),
  // },
];

// function handleViewProfile(counselor) {
//   console.log('Viewing profile for:', counselor.name);
// }

// function handleCheckAvailability(counselor) {
//   console.log('Checking availability for:', counselor.name);
// }
