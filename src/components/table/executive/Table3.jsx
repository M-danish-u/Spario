import React, { useEffect, useMemo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Filter from "../Filter";

const Table3 = ({ heading, DATA, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 }, // Initial page index and page size
    },
    useGlobalFilter,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter, // <-- Added setGlobalFilter
  } = tableInstance;

  useEffect(() => {
    setPageSize(8);
  }, []);

  return (
    <div>
      <div className="font-medium text-xl text-[#343C6A]">{heading}</div>

      <div className="shadow-lg rounded-lg px-4 pt-4 overflow-x-auto bg-white mt-4 h-full">
        <Filter filter={globalFilter} setFilter={setGlobalFilter} />

        <table {...getTableProps()} className="min-w-full bg-white table-auto">
          <thead className="border-b">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="bg-white font-normal text-[#718EBF] border-b-1 px-6 py-3 text-left"
                    key={column.id}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-3 border-b text-left"
                        key={cellIndex}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-end p-5 gap-3">
          <button
            className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1"
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
          >
            <FaChevronLeft className="h-4" />
          </button>
          <div>{pageIndex + 1}</div>
          <button
            className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1"
            disabled={!canNextPage}
            onClick={() => nextPage()}
          >
            <FaChevronRight className="h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table3;
