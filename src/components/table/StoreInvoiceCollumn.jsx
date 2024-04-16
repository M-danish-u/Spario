import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const StoreInvoiceCollumn = () => [
  {
    Header: "SL No",
    accessor: "no",
  },
  {
    Header: "Invoice No.",
    accessor: "invoiceNo",
  },
  {
    Header: " Total  ",
    accessor: "total",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.total} {/* Add the Rupee icon */}
      </div>
    ),
  },
  {
    Header: " Paid  ",
    accessor: "paid",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.total} {/* Add the Rupee icon */}
      </div>
    ),
  },

  
  {
    Header: " Due  ",
    accessor: "due",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
        <LiaRupeeSignSolid className="text-red-600" />{" "}
        <span style={{ color: row.original.due > 0 ? "red" : "inherit" }}>
          {row.original.due}
        </span>
      </div>
    ),
  },
  {
    Header: " Date",
    accessor: "date",
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
