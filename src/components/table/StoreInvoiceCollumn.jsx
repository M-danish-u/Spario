import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const StoreInvoiceCollumn = () => [
  {
    Header: "SL No",
    accessor: "id",
    Cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    Header: "Invoice Number",
    accessor: "invoice_number",
  },
  {
    Header: " Total  ",
    accessor: "invoice_value",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.invoice_value} {/* Add the Rupee icon */}
      </div>
    ),
  },
  // {
  //   Header: "Advance   ",
  //   accessor: "advance_paid",
  //   Cell: ({ row }) => (
  //     <div className="flex flex-row items-center justify-cente ">
  //       <LiaRupeeSignSolid /> {row.original.advance_paid} {/* Add the Rupee icon */}
  //     </div>
  //   ),
  // },

  {
    Header: "Total Paid  ",
    accessor: "Collect_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.collect_amount} {/* Add the Rupee icon */}
      </div>
    ),
  },
  // {
  //   Header: "Payment Method",
  //   accessor: "payment_method",
  //   Cell: ({ row }) => (
  //     <div className="fitems-center justify-cente">
  //       <div>{row.original.payment_method}</div>
  //       <div className="mx-2"> </div> {/* Separator between Payment Method and Reference No */}
  //       <div>{row.original.reference_no}</div> {/* Displaying Reference No */}
  //     </div>
  //   ),
  // },

  
  
  {
    Header: " Due  ",
    accessor: "invoice_balance_amount ",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center ">
        <LiaRupeeSignSolid className="text-red-600" />{" "}
        <div style={{ color: row.original.invoice_balance_amount > -1 ? "red" : "inherit" }}>
          {row.original.invoice_balance_amount}
        </div>
      </div>
    ),
  },
  {
    Header: "Due Date",
    accessor: "due_date",
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
