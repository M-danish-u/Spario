import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const TransactionsCollumn = (handleViewStore, handleEdit) => [
  {
    Header: "No",
    accessor: "no",
  },
  {
    Header: "Executive",
    accessor: "executiveName",
  },
  {
    Header: " Store  ",
    accessor: "storeName",
  },

  {
    Header: " Received  ",
    accessor: "received",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.received} {/* Add the Rupee icon */}
      </div>
    ),
  },
  
  {
    Header: " Remarks",
    accessor: "remarks",
  },

  {
    Header: " Date",
    accessor: "date",
  },
//   {
//     //   Header: 'View Profile',
//     accessor: "viewprofile",
//     Cell: ({ row }) => (
//       <button
//         onClick={() => handleViewStore(row.original)}
//         className="text-[#2723F4]"
//       >
//         View More
//       </button>
//     ),
//   },

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

 
];

