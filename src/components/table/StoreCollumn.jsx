import { FaUser } from "react-icons/fa6";
import { FaUserClock } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { LiaRupeeSignSolid } from "react-icons/lia";

export const StoreCollumn = (handleViewStore, handleEdit) => [
  {
    Header: "No",
    accessor: "no",
  },
  {
    Header: "Store Name",
    accessor: "storeName",
  },
  {
    Header: " Customer Name  ",
    accessor: "customerName",
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
    Header: " Exicutive",
    accessor: "exicutive",
  },
  {
    //   Header: 'View Profile',
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

  {
    //   Header: 'EDIT',
    accessor: "edit",
    Cell: ({ row }) => (
      <button
        onClick={() => handleEdit(row.original)}
        className="text-[#B1B1B1] text-xl"
      >
        <FaRegEdit />
      </button>
    ),
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
