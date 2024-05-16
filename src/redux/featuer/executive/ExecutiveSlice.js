import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {
  addAmountAPI,
  addStoreExecutive,
  createExpenseAPI,
  createReturnAPI,
  getBalanceAPI,
  getExecutiveDashboardAPI,
  getExecutiveExpenseAPI,
  getExecutiveInvoiceAPI,
  getExecutiveReturnAPI,
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
  BalanceStore:null,
  InvoiceData:null,
  createReturn:null,
  ReturnData:null,
  ExpenseData:null,
  // StoreCreate:null,
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

export const getBalance = createAsyncThunk(
  "admin/getBalance",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getBalanceAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
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

export const getExecutivInvoice = createAsyncThunk(
  "executive/getExecutivInvoice",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveInvoiceAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createReturn = createAsyncThunk(
  "executive/createReturn",
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await axios.post(`${createReturnAPI}/${id}`,body);
      console.log(response,'resss');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getExecutiveReturns = createAsyncThunk(
  "executive/getExecutiveReturns",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveReturnAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const createExpense = createAsyncThunk(
  "executive/createExpense",
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await axios.post(`${createExpenseAPI}/${id}`,body);
      console.log(response,'resss');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getExecutiveExpense = createAsyncThunk(
  "executive/getExecutiveExpense",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveExpenseAPI}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const createExecutiveStore = createAsyncThunk(
//   "admin/createExecutiveStore",
//   async ({id,body}, { rejectWithValue }) => {
//     try {
//       // Assuming createStoreAPI is defined somewhere
//       const response = await axios.post(`${addStoreExecutive}/${id}`,body);
//       console.log(response.data, "store response");
//       return response.data;
//     } catch (error) {
//       console.log(error.response.data.errors, 'checking the response from the backend');
//       return rejectWithValue(error.response.data.errors);
//     }
//   }
// );
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

      .addCase(getBalance.fulfilled, (state, action) => {
        state.BalanceStore = action.payload;
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
      })


      .addCase(getExecutivInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExecutivInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.InvoiceData = action.payload;
      })
      .addCase(getExecutivInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createReturn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReturn.fulfilled, (state, action) => {
        state.loading = false;
        state.ReturnData.unshift(action.payload.return)
        state.createReturn = action.payload;
      })
      .addCase(createReturn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(getExecutiveReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExecutiveReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.ReturnData = action.payload;
      })
      .addCase(getExecutiveReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(createExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.ExpenseData.expenses.unshift(action.payload.expense)
        state.createReturn = action.payload;
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getExecutiveExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getExecutiveExpense.fulfilled, (state, action) => {
        state.loading = false;
        state.ExpenseData = action.payload;
      })
      .addCase(getExecutiveExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // .addCase(createExecutiveStore.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(createExecutiveStore.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.StoreCreate.unshift(action.payload.return)
      //   state.createExecutiveStore = action.payload;
      // })
      // .addCase(createExecutiveStore.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
  },
});

export default executiveSlice.reducer;
