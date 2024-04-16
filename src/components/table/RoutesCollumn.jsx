import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const RoutesCollumn = (handleViewStore) => [
  {
    Header: "SL No",
    accessor: "no",
  },
  {
    Header: "Rout Name",
    accessor: "routeName",
  },
  
  {
    //   Header: 'View Profile',
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewStore(row.original)}
        className="text-[#2723F4]"
      >
        View Stores
      </button>
    ),
  },

 
 


];

