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
    accessor: "totalAmount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.totalAmount} {/* Add the Rupee icon */}
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
    accessor: "dueAmount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
        <LiaRupeeSignSolid className="text-red-600" />{" "}
        <span style={{ color: row.original.dueAmount > -1 ? "red" : "inherit" }}>
          {row.original.dueAmount}
        </span>
      </div>
    ),
  },
  {
    Header: " Date",
    accessor: "created_at",
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
