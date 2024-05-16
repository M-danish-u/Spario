// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from "../../api/axios";  // Assuming axios is configured similarly to your auth slice
// import { CustomerAPI } from '../../api/url';


// // Thunks
// export const fetchAllCustomers = createAsyncThunk(
//   'customers/fetchAll',
//   async () => {
//     const response = await axios.get(${CustomerAPI});
//     console.log("fetchallcustomer from the customer slice",response.data)
//     return response.data;
//   }
// );

// export const fetchCustomer = createAsyncThunk(
//   'customers/fetchCustomer',
//   async (id) => {
//     const response = await axios.get(${CustomerAPI}/${id});
//     return response.data;
//   }
// );

// export const createCustomer = createAsyncThunk(
//   'customers/createCustomer',
//   async (customerData) => {
//     const response = await axios.post(${CustomerAPI}, customerData);
//     return response.data;
//   }
// );

// export const updateCustomer = createAsyncThunk(
//   'customers/updateCustomer',
//   async ({ id, customerData }) => {
//     const response = await axios.put(${CustomerAPI}/${id}, customerData);
//     return response.data;
//   }
// );

// export const deleteCustomer = createAsyncThunk(
//   'customers/deleteCustomer',
//   async (id) => {
//     await axios.delete(${CustomerAPI}/${id});
//     return id;
//   }
// );

// export const fetchCustomerSalesDetails = createAsyncThunk(
//   'customers/fetchSalesDetails',
//   async (customerId) => {
//     const response = await axios.get(${CustomerAPI}/${customerId}/sales);
//     return response.data;
//   }
// );

// // Slice
// const customerSlice = createSlice({
//   name: 'customers',
//   initialState: {
//     customers: [],
//     currentCustomer: null,
//     salesDetails: null,
//     loading: false,
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllCustomers.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllCustomers.fulfilled, (state, action) => {
//         state.loading = false;
//         state.customers = action.payload;
//       })
//       .addCase(fetchAllCustomers.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
      
//       .addCase(fetchCustomer.fulfilled, (state, action) => {
//         state.currentCustomer = action.payload;
//       })
//       .addCase(createCustomer.fulfilled, (state, action) => {
//         state.customers.push(action.payload);
//       })
//       .addCase(updateCustomer.fulfilled, (state, action) => {
//         const index = state.customers.findIndex(c => c.id === action.payload.id);
//         if (index !== -1) {
//           state.customers[index] = action.payload;
//         }
//       })
//       .addCase(deleteCustomer.fulfilled, (state, action) => {
//         state.customers = state.customers.filter(c => c.id !== action.payload);
//       })
//       .addCase(fetchCustomerSalesDetails.fulfilled, (state, action) => {
//         state.salesDetails = action.payload;
//       });
//   }
// });

// export default customerSlice.reducer;

import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const Chart = () => {
  const data = [
    { name: "Jan", uv: 4000, amt: 2400, pv: 2400 },
    { name: "Feb", uv: 3000, amt: 2210, pv: 2210 },
    { name: "Mar", uv: 2000, amt: 1290, pv: 2290 },
    { name: "Apr", uv: 2780, amt: 2000, pv: 2000 },
    { name: "May", uv: 1890, amt: 1181, pv: 2181 },
    { name: "Jun", uv: 2390, amt: 2200, pv: 2500 },
    // { name: 'month 7', uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="p">
      <p className="font-medium text-xl text-[#343C6A]">Monthly Chart</p>
      <div className="mt-2 bg-white overflow-x-auto p-4 scrollbar-hidden rounded-xl shadow-m">
        <ResponsiveContainer width={700} height={300}>
          <ComposedChart
            data={data}
            // margin={{
            //   top: 20,
            //   right: 20,
            //   bottom: 20,
            //   left: 20,
            // }}
          >
            {/* <CartesianGrid stroke="#f5f5f5" /> */}
            <XAxis axisLine={false} dataKey="name"  />
            <YAxis axisLine={false}/>
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            {/* <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" /> */}
            <Bar dataKey="uv" fill="#16DBCC" radius={[5, 5, 0, 0]} barSize={40} />
            <Line 
  type="monotone" 
  dataKey="amt" 
  stroke="#FCAA0B" 
  strokeWidth={3} 
  isAnimationActive={false} 
  connectNulls
  // path={`
  //   M${data[0].cx},${data[0].cy}
  //   L${data[1].cx},${data[1].cy}
  //   L${data[2].cx},${data[2].cy}
  //   L${data[3].cx},${data[3].cy}
  //   L${data[4].cx},${data[4].cy}
  //   L${data[5].cx},${data[5].cy}
  // `}
/>
            {/* <Scatter dataKey="cnt" fill="red" /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;


import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Filter from "../table/Filter";
import DateFilter from "../table/ReportFilter"; // Import the DateFilter component
import DatepickerFilter from "./DatepickerFilter";

const Table4 = ({ heading, DATA, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const [filteredData, setFilteredData] = useState(data);
  const pdfViewerRef = useRef(null);

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

  // Function to convert data to CSV format
  const convertToCSV = () => {
    const csvData = [
      columns.map(column => column.Header), // Header row
      ...filteredData.map(row => columns.map(column => row[column.accessor])) // Data rows
    ];

    // Create CSV content
    const csvContent = csvData.map(row => row.join(",")).join("\n");

    // Create a Blob object to download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="font-medium text-xl text-[#343C6A]">{heading}</div>
      <div className="shadow-lg rounded-lg px-4 pt-4 overflow-x-auto bg-white mt-4 h-full">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between space-x-4 b-slate-500 mt-4">
          <Filter filter={globalFilter} setFilter={setGlobalFilter} />
          <DateFilter data={DATA} onDateFilterChange={handleDateFilterChange} />
        </div>
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
          {/* Add CSV download button */}
          <button onClick={convertToCSV}>Download CSV</button>
        </div>
      </div>
    </div>
  );
};

export default Table4;




import React, { useEffect, useMemo, useState, useRef } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PDFDownloadLink, PDFViewer, Document, Page } from "@react-pdf/renderer";
import Filter from "../table/Filter";
import DateFilter from "../table/ReportFilter"; // Import the DateFilter component
import DatepickerFilter from "./DatepickerFilter";

const Table4 = ({ heading, DATA, COLUMNS }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const [filteredData, setFilteredData] = useState(data);
  const pdfViewerRef = useRef(null);

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

  return (
    <div>
      <div className="font-medium text-xl text-[#343C6A]">{heading}</div>
      <div className="shadow-lg rounded-lg px-4 pt-4 overflow-x-auto bg-white mt-4 h-full">
        <div className="flex flex-col md:flex-row gap-4 md:justify-between space-x-4 b-slate-500 mt-4">
          <Filter filter={globalFilter} setFilter={setGlobalFilter} />
          <DateFilter data={DATA} onDateFilterChange={handleDateFilterChange} />
        </div>
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
          <PDFDownloadLink document={<PDFDocument data={filteredData} columns={columns} />} fileName="data.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Generating PDF..." : <button>Download PDF</button>
            }
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

const PDFDocument = ({ data, columns }) => {
  return (
    <Document>
      <Page>
        <table>
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th key={columnIndex}>{column.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>{row[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </Document>
  );
};


export default Table4;


const exportPDF = () => {
  const doc = new jsPDF(); // Initialize jsPDF
  doc.text(heading, 10, 10); // Add heading to the PDF

  // Filter out the column with header "Actions" and "No"
  const filteredColumns = columns.filter((column) => column.Header !== "Actions" && column.Header !== "No" && column.Header !== "SL No");

  // Add table headers
  const headers = filteredColumns.map((column) => column.Header);

  // Extract values from each row object
  const rows = data.map((row) =>
    filteredColumns.map((column) => {
      const cellValue = row[column.accessor];
      return typeof cellValue === "object" ? JSON.stringify(cellValue) : cellValue;
    })
  );

  doc.autoTable({
    head: [headers],
    body: rows,
  });

  doc.save("data.pdf"); // Save the PDF
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




// import React, { useEffect, useMemo, useState } from "react";
// import { useTable, useGlobalFilter, usePagination } from "react-table";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import jsPDF from "jspdf"; // Import jsPDF library
// import "jspdf-autotable"; // Import jsPDF autotable plugin

// import Filter from "../table/Filter";
// import DateFilter from "../table/ReportFilter";
// import DatepickerFilter from "./DatepickerFilter";
// import { loginAdminAPI } from "../../api/url";

// const Table4 = ({ heading, DATA, COLUMNS }) => {
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => DATA, []);
//   const [filteredData, setFilteredData] = useState(data);

//   const tableInstance = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 8 },
//     },
//     useGlobalFilter,
//     usePagination
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     gotoPage,
//     pageCount,
//     setPageSize,
//     prepareRow,
//     state: { pageIndex, pageSize, globalFilter },
//     setGlobalFilter,
//   } = tableInstance;

//   useEffect(() => {
//     setPageSize(8);
//   }, []);

//   const handleDateFilterChange = (filteredData) => {
//     setFilteredData(filteredData);
//   };

//   const exportPDF = () => {
//     const doc = new jsPDF(); // Initialize jsPDF
//     doc.text(heading, 10, 10); // Add heading to the PDF
  
//     // Filter out the column with header "Actions" and "No"
//     const filteredColumns = columns.filter((column) => column.Header !== "Actions" && column.Header !== "No" && column.Header !== "SL No");
  
//     // Add table headers
//     const headers = filteredColumns.map((column) => column.Header);
  
//     // Extract values from each cell's data object, excluding "No" column
//     const rows = page.map((row) =>
//       row.cells.filter((cell) => cell.column.Header !== "No").map((cell) => {
//         const value = cell.render("Cell").props.value;
//         return typeof value === "object" ? JSON.stringify(value) : value;
//       })
//     );
  
//     doc.autoTable({
//       head: [headers],
//       body: rows,
//     });
  
//     doc.save("data.pdf"); // Save the PDF
//   };
  
  
  
  
  

//   return (
//     <div>
//       <div className="font-medium text-xl text-[#343C6A]">{heading}</div>
//       <div className=" rounded-[12px] p-4 overflow-x-auto bg-white mt-4 h-full">
//         <div className="flex flex-col md:flex-row gap-4 md:justify-between space-x-4 b-slate-500 ">
//           <Filter filter={globalFilter} setFilter={setGlobalFilter} />
//           <div className="flex flex-col md:flex-row gap-2 ">
//           <DateFilter data={DATA} onDateFilterChange={handleDateFilterChange} />
//           <button
//             className="bg-[#F6F8FB] ml-[-15px] md:ml-0 rounded-md h-10 w-max border text-gray-700 font-semibold   px-4 "
//             onClick={exportPDF}
//           >
//             Download PDF
//           </button>
//           </div>
//         </div>
//         <table {...getTableProps()} className="min-w-full bg-white table-auto">
//           <thead className="border-b border-[#f1f1f1]">
//             {headerGroups.map((headerGroup) => (
//               <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     {...column.getHeaderProps()}
//                     scope="col"
//                     className="bg-white font-normal text-[#718EBF] border-b  px-6 py-3 text-left"
//                     key={column.id}
//                   >
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row, rowIndex) => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()} key={rowIndex}>
//                   {row.cells.map((cell, cellIndex) => {
//                     return (
//                       <td
//                         {...cell.getCellProps()}
//                         className="px-6 py-3 border-b border-[#f1f1f1] text-left"
//                         key={cellIndex}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//         <div className="flex justify-end pt-4 gap-3">
//           <button
//             className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1"
//             disabled={!canPreviousPage}
//             onClick={() => previousPage()}
//           >
//             <FaChevronLeft className="h-4" />
//           </button>
//           <div>{pageIndex + 1}</div>
//           <button
//             className="bg-[#F6F8FB] rounded-md py-1 border text-gray-700 font-bold p-1"
//             disabled={!canNextPage}
//             onClick={() => nextPage()}
//           >
//             <FaChevronRight className="h-4" />
//           </button>
          
         
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Table4;
