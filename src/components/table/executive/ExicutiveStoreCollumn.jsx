import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const ExecutiveStoreCollumn = (handleViewStore, handleAddAmount) => [
  {
    Header: "No",
    accessor: "id",
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
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.total_amount} {/* Add the Rupee icon */}
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
    Header: " Paid  ",
    accessor: "paidAmount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
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
        className="text-white p-2 rounded-md bg-green-500"
      >
        Add Amount
      </button>
    ),
  },
  {
      Header: 'View Profile',
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewStore(row.original)}
        className="text-[#2723F4]"
      >
        View Store
      </button>
    ),
  },

//   {
//     //   Header: 'EDIT',
//     accessor: "edit",
//     Cell: ({ row }) => (
//       <button
//         onClick={() => handleEdit(row.original)}
//         className="text-[#B1B1B1] text-xl"
//       >
//         <FaRegEdit />
//       </button>
//     ),
//   },

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
