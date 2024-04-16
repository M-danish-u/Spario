import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const RouteProfileCollumn = (handleViewInvoices) => [
  {
    Header: "SL No",
    accessor: "no",
  },
  {
    Header: "Store Name",
    accessor: "store.storeName",
  },
  
  {
    //   Header: 'View Profile',
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewInvoices(row.original)}
        className="text-[#2723F4]"
      >
        Invoices
      </button>
    ),
  },

 
 


];
