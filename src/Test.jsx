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
