import React, { useEffect, useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import jsPDF from "jspdf"; // Import jsPDF library
import "jspdf-autotable"; // Import jsPDF autotable plugin

import Filter from "../table/Filter";
import DateFilter from "../table/ReportFilter";
import DatepickerFilter from "./DatepickerFilter";
import { loginAdminAPI } from "../../api/url";

const Table4 = ({ heading, DATA, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const [filteredData, setFilteredData] = useState(data);

  const tableInstance = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 8 },
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
    setGlobalFilter,
  } = tableInstance;

  useEffect(() => {
    setPageSize(8);
  }, []);

  const handleDateFilterChange = (filteredData) => {
    setFilteredData(filteredData);
  };

  const exportPDF = () => {
    const doc = new jsPDF(); // Initialize jsPDF
    doc.text(heading, 10, 10); // Add heading to the PDF
  
    // Filter out the column with header "Actions" and "No"
    const filteredColumns = columns.filter((column) => column.Header !== "Actions" && column.Header !== "No" && column.Header !== "SL No");
  
    // Add table headers
    const headers = filteredColumns.map((column) => column.Header);
  
    // Extract values from each cell's data object, excluding "No" column
    const rows = page.map((row) =>
      row.cells.filter((cell) => cell.column.Header !== "No").map((cell) => {
        const value = cell.render("Cell").props.value;
        return typeof value === "object" ? JSON.stringify(value) : value;
      })
    );
  
    doc.autoTable({
      head: [headers],
      body: rows,
    });
  
    doc.save("data.pdf"); // Save the PDF
  };
  
  
  
  
  

  return (
    <div>
      <div className="font-medium text-xl text-[#343C6A]">{heading}</div>
      <div className=" rounded-[12px] p-4 overflow-x-auto bg-white mt-4 h-full">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between space-x-4 b-slate-500 ">
          <Filter filter={globalFilter} setFilter={setGlobalFilter} />
          <div className="flex flex-col md:flex-row gap-2 ">
          <DateFilter data={DATA} onDateFilterChange={handleDateFilterChange} />
          <button
            className="bg-[#F6F8FB] ml-[-15px] md:ml-0 rounded-md h-10 w-max border text-gray-700 font-semibold   px-4 "
            onClick={exportPDF}
          >
            Download PDF
          </button>
          </div>
        </div>
        <table {...getTableProps()} className="min-w-full bg-white table-auto">
          <thead className="border-b border-[#f1f1f1]">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    scope="col"
                    className="bg-white font-normal text-[#718EBF] border-b  px-6 py-3 text-left"
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
                        className="px-6 py-3 border-b border-[#f1f1f1] text-left"
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
        <div className="flex justify-end pt-4 gap-3">
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

export default Table4;
