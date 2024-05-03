import { LiaRupeeSignSolid } from "react-icons/lia";

export const ExecutiveStoreCollumn = (handleViewStore, handleAddAmount) => [
  {
    Header: "No",
    accessor: "id",
    Cell: ({ row }) => <span>{row.index + 1}</span>,
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
      <div className="flex flex-row items-center justify-center">
        <LiaRupeeSignSolid /> {row.original.total_amount} {/* Add the Rupee icon */}
      </div>
    ),
  },
  {
    Header: " Due  ",
    accessor: "balance_amount",
    Cell: ({ row }) => (
      <div className="flex flex-row items-center">
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
      <div className="flex flex-row items-center">
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
        className={`text-white p-2 rounded-md ${
          row.original.balance_amount < 1 ? "bg-gray-400" : "bg-green-500"
        }`}
        disabled={row.original.balance_amount < 1}
      >
      {row.original.balance_amount < 1 ? "No Amount " : "Add Amount"}
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
  // Other columns...
];
