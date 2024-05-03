import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const RoutesCollumn = (handleViewStore) => [
  {
    Header: "SL No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    Header: "Rout Name",
    accessor: "route_name",
  },
  
  {
      Header: 'Action',
    accessor: "viewprofile",
    Cell: ({ row }) => (
      <button
        onClick={() => handleViewStore(row.original)}
        className="text-[#2723F4] cursor-pointer"
      >
        View Stores
      </button>
    ),
  },

 
 


];

