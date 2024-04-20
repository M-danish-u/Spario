import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import { addAmountAPI, getExecutiveDashboardAPI, getExecutiveStoreAPI, getExecutiveStoreStoreAPI, getTransactionsAPI } from "../../../api/url";


const initialState = {
    DashboardData:null,
    StoreData:null,
    StoreProfileData:null,
    AddAmount:null,
    TransactionData:null,
};

// / *************DASHBOARD*************



export const getExecutiveDashboard = createAsyncThunk(
    "executive/getExecutiveDashboard",
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`${getExecutiveDashboardAPI}/${id}`);
        // console.log(response.data, "rrrrrrr");
        return response.data;
      } catch (error) {
        console.log(error.response.data, "its rejecerd");
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  // get store

  export const getExecutiveStore = createAsyncThunk(
    "executive/getExecutiveStore",
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`${getExecutiveStoreAPI}/${id}`);
        // console.log(response.data, "rrrrrrr");
        return response.data;
      } catch (error) {
        console.log(error.response.data, "its rejecerd");
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

// store Profile

  export const getSingleExecutiveStore = createAsyncThunk(
    "executive/getSingleExecutiveStore",
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`${getExecutiveStoreStoreAPI}/${id}`);
        console.log(response.data, "rrrrrrr");
        return response.data;
      } catch (error) {
        console.log(error.response.data, "its rejecerd");
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
// add amount

export const AddAmount = createAsyncThunk(
  "executive/AddAmount",
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await axios.post(`${addAmountAPI}/${id}`, body);
      console.log(response.data,'bgbgbg');
      return response.data;
    } catch (error) {
      console.log(error.response.data, "it's rejected");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


  // get transactions

  export const getExecutivTransactions = createAsyncThunk(
    "executive/getExecutivTransactions",
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`${getTransactionsAPI}/${id}`);
        // console.log(response.data, "rrrrrrr");
        return response.data;
      } catch (error) {
        console.log(error.response.data, "its rejecerd");
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  
const executiveSlice = createSlice({
  name: "executive",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getExecutiveDashboard.fulfilled, (state, action) => {
        state.DashboardData = action.payload;
      })

      .addCase(getExecutiveStore.fulfilled, (state, action) => {
        state.StoreData = action.payload;
      })
      .addCase(getSingleExecutiveStore.fulfilled, (state, action) => {
        state.StoreProfileData = action.payload;
      })
      .addCase(AddAmount.fulfilled, (state, action) => {
        state.AddAmount = action.payload;
      })
      .addCase(getExecutivTransactions.fulfilled, (state, action) => {
        state.TransactionData = action.payload;
      })
  },
});

export default executiveSlice.reducer;
