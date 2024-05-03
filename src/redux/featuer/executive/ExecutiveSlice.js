import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {
  addAmountAPI,
  getExecutiveDashboardAPI,
  getExecutiveStoreAPI,
  getExecutiveStoreStoreAPI,
  getTransactionsAPI,
} from "../../../api/url";

const initialState = {
  DashboardData: null,
  StoreData: null,
  StoreProfileData: null,
  AddAmount: null,
  TransactionData: null,
  loading: false, // Add loading state to the initial state
  error: null, // Add error state to the initial state
};

export const getExecutiveDashboard = createAsyncThunk(
  "executive/getExecutiveDashboard",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveDashboardAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getExecutiveStore = createAsyncThunk(
  "executive/getExecutiveStore",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveStoreAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSingleExecutiveStore = createAsyncThunk(
  "executive/getSingleExecutiveStore",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveStoreStoreAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const AddAmount = createAsyncThunk(
  "executive/AddAmount",
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await axios.post(`${addAmountAPI}/${id}`, body);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getExecutivTransactions = createAsyncThunk(
  "executive/getExecutivTransactions",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getTransactionsAPI}/${id}`);
      return response.data;
    } catch (error) {
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
      .addCase(getExecutiveDashboard.pending, (state) => {
        state.loading = true; // Set loading state to true when pending
        state.error = null; // Clear any previous errors
      })
      .addCase(getExecutiveDashboard.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false when fulfilled
        state.DashboardData = action.payload;
      })
      .addCase(getExecutiveDashboard.rejected, (state, action) => {
        state.loading = false; // Set loading state to false when rejected
        state.error = action.payload; // Set error state
      })
      .addCase(getExecutiveStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExecutiveStore.fulfilled, (state, action) => {
        state.loading = false;
        state.StoreData = action.payload;
      })
      .addCase(getExecutiveStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSingleExecutiveStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleExecutiveStore.fulfilled, (state, action) => {
        state.loading = false;
        state.StoreProfileData = action.payload;
      })
      .addCase(getSingleExecutiveStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(AddAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.AddAmount = action.payload;
      })
      .addCase(AddAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getExecutivTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExecutivTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.TransactionData = action.payload;
      })
      .addCase(getExecutivTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default executiveSlice.reducer;
