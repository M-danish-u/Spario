import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const ReturnCollumn = () => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  
  {
    Header: " Store  ",
    accessor: "store.store_name",
  },

  {
    Header: " Return Amount  ",
    accessor: "return_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center justify-cente ">
        <LiaRupeeSignSolid /> {row.original.return_amount} 
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



 
];

