import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {
  ExpensesStatusApproveAPI,
  ExpensesStatusRejectAPI,
  createExecutiveAPI,
  createInvoiceAPI,
  createRouteAPI,
  createStoreAPI,
  executiveStatusChangeAPI,
  getAdminDashboardAPI,
  getAdminRExpensesAPI,
  getAdminReturnAPI,
  getAdminTransactionsAPI,
  getAllExecutiveAPI,
  getAllInvoiceAPI,
  getAllRouteAPI,
  getAllStoreAPI,
  getExecutiveProfileAPI,
  getRouteProfileAPI,
  getStoreBalanceAPI,
  getStoreProfileAPI,
  updateExecutiveAPI,
  updateStoreAPI,
} from "../../../api/url";
import { array } from "yup";

const initialState = {
  ExecutiveData: null,
  AllExecutiveData: null,
  UpdateExicutive: null,
  ExecutiveProfile: null,
  Route: null,
  AllRouteData: null,
  Store: null,
  AllStoreData: null,
  StoreProfile: null,
  UpdateStore: null,
  AllInvoiceData: null,
  CreateInvoices:null,
  RouteStoresProfile: null,
  DashboardData:null,
  AllTransactions: null,
  BalanceStore:null,
  ExecutiveStatus:null,
  currentStore:[],
  AllReturns:null,
  AllExpenses:null,
  ExpenseStatusApprove:null,
  ExpenseStatusReject:null


};

// *************DASHBOARD*************

export const getAdminDashboard = createAsyncThunk(
  'admin/getAdminDashboard"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAdminDashboardAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// **********INVOICES***********

//   get invoices

export const getAllInvoices = createAsyncThunk(
  'admin/getAllInvoices"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAllInvoiceAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// create invoices

export const createInvoices = createAsyncThunk(
  "admin/createInvoices",
  async (body, { rejectWithValue }) => {
    try {
      // Validate body parameter here if necessary

      const response = await axios.post(createInvoiceAPI, body);
      //   console.log(response.data,'rrrrrrrr');
      return response.data;
    } catch (error) {
      console.error(error.response.data, 'checking the response from the backend');
      return rejectWithValue(error.response.data);
    }
  }
);

//    get balance

export const getBalance = createAsyncThunk(
  "admin/getBalance",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getStoreBalanceAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//   get executive

export const getAllExecutive = createAsyncThunk(
  'admin/getAllExecutive"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAllExecutiveAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// create executive

export const createExecutive = createAsyncThunk(
  "admin/createExecutive",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(createExecutiveAPI, body);
      console.log(response.data, "ssssssssssssssssssssssss");
      return response.data;
    } catch (error) {
      console.log(error.response.data.errors, 'checking the response from the backend');
      return rejectWithValue(error.response.data.errors);
    }
  }
);
//   edit exicutive

export const editExicutive = createAsyncThunk(
  "admin/editExicutive",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // Validate parameters here if necessary

      const response = await axios.put(`${updateExecutiveAPI}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors, 'checking the response from the backend');
      return rejectWithValue(error.response.data.errors);
    }
  }
);


//    get  executive profile

export const getSingleExecutive = createAsyncThunk(
  "admin/getSingleUniversity",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getExecutiveProfileAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// **********************ROUTE******************

// create route

export const createRoute = createAsyncThunk(
  "admin/createRoute",
  async (body) => {
    try {
      // Validate body parameter here if necessary

      const response = await axios.post(createRouteAPI, body);
      //   console.log(response.data,'rrrrrrrr');

      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
    }
  }
);

// get route

export const getAllRoute = createAsyncThunk(
  'admin/getAllRoute"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAllRouteAPI}`);
      console.log(response.data, "rrrrr");

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//    get  rout store veiw

export const getSingleRouteStore = createAsyncThunk(
  "admin/getSingleRouteStore",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getRouteProfileAPI}/${id}`);
      // console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// *******************STORE*********************

// create 

export const createStore = createAsyncThunk(
  "admin/createStore",
  async (body, { rejectWithValue }) => {
    try {
      // Assuming createStoreAPI is defined somewhere
      const response = await axios.post(createStoreAPI, body);
      console.log(response.data, "store response");
      return response.data;
    } catch (error) {
      console.log(error.response.data.errors, 'checking the response from the backend');
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// get stores

export const getAllStores = createAsyncThunk(
  'admin/getAllStores"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAllStoreAPI}`);
      console.log(response.data, "rrrrr");

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// status change

export const executiveStatusChange = createAsyncThunk(
  "admin/executiveStatusChange",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${executiveStatusChangeAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//    get  store profile

export const getSingleStore = createAsyncThunk(
  "admin/getSingleStore",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${getStoreProfileAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//   edit store

export const editStore = createAsyncThunk(
  "admin/editStore",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      // Validate parameters here if necessary

      const response = await axios.put(`${updateStoreAPI}/${id}`, data);
      console.log(response.data, 'resss');
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors, 'checking the response from the backend');
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// ***********************TRANSACTIONS********************

//   get transactino

export const getAllTransactions = createAsyncThunk(
  'admin/getAllTransactions"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAdminTransactionsAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ********************RETURN**********************

// get return


export const getAllReturn = createAsyncThunk(
  'admin/getAllReturn"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAdminReturnAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// ********EXPENSES**********

// get expenses

export const getAllExpenses = createAsyncThunk(
  'admin/getAllExpenses"',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${getAdminRExpensesAPI}`);
      // console.log(response.data,'rrrrr');

      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerdf");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }

);

// status change

export const expenseStatusApprove = createAsyncThunk(
  "admin/expenseStatusApprove",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${ExpensesStatusApproveAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const expenseStatusReject = createAsyncThunk(
  "admin/expenseStatusReject",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${ExpensesStatusRejectAPI}/${id}`);
      console.log(response.data, "rrrrrrr");
      return response.data;
    } catch (error) {
      console.log(error.response.data, "its rejecerd");
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //******************DASHBOARD**************
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.DashboardData = action.payload;
      })
    // ************EXECUTIVE***********
      .addCase(getAllExecutive.fulfilled, (state, action) => {
        state.AllExecutiveData = action.payload;
      })

      .addCase(createExecutive.fulfilled, (state, action) => {
        state.ExecutiveData = action.payload;
        state.AllExecutiveData.executives.unshift(action.payload.executive)
        // console.log('success test');
      })

      .addCase(createExecutive.rejected, (state, action) => {
        state.ExecutiveData = action.payload;
        // console.log('reject tet ',action.payload);
      })


      .addCase(getSingleExecutive.fulfilled, (state, action) => {
        state.ExecutiveProfile = action.payload;
      })
      .addCase(editExicutive.fulfilled, (state, action) => {
        const updatedExicutive = action.payload.executive;
        const index = state.AllExecutiveData.executives.findIndex(exicutive => exicutive.id === updatedExicutive.id);
        if (index !== -1) {
          state.AllExecutiveData.executives[index] = updatedExicutive;
          if (state.ExecutiveProfile && state.ExecutiveProfile.id === updatedExicutive.id) {
            state.ExecutiveProfile = updatedExicutive;
          }
        }
      })

      .addCase(executiveStatusChange.fulfilled, (state, action) => {
        const updateExicutive = action.payload.executive; // Assuming the payload contains the updated executive
        const index = state.AllExecutiveData.executives.findIndex(exicutive => exicutive.id === updateExicutive.id);
        if (index !== -1) {
          state.AllExecutiveData.executives[index] = updateExicutive;
          if (state.ExecutiveProfile && state.ExecutiveProfile.id === updateExicutive.id) {
            state.ExecutiveProfile = updateExicutive;
          }
        }
      })
      
      // .addCase(deleteUniversity.fulfilled, (state, action) => {
      //   state.UniversityDetails = action.payload;
      // })

      // **********ROUTE**********

      .addCase(getAllRoute.fulfilled, (state, action) => {
        state.AllRouteData = action.payload;
      })

      .addCase(createRoute.fulfilled, (state, action) => {
        state.Route = action.payload;
        state.AllRouteData.routes.unshift(action.payload.route)
      })

      .addCase(getSingleRouteStore.fulfilled, (state, action) => {
        state.RouteStoresProfile = action.payload;
      })

      // **********STORE**********

      .addCase(createStore.fulfilled, (state, action) => {
        state.Store = action.payload;
        state.AllStoreData.stores.unshift(action.payload.store)
      })
      .addCase(createStore.rejected, (state, action) => {
        state.AllStoreData = action.payload;
        // console.log('reject tet ',action.payload);
      })


      .addCase(getAllStores.fulfilled, (state, action) => {
        state.AllStoreData = action.payload;
        // if(Array.isArray(state.UpdateStore)){
        //   state.AllStoreData.stores.unshift(action.payload.store)
        // }else{console.error('state.stores is not an array;',typeof(state.stores))}
        
      })

      
      .addCase(editStore.fulfilled, (state, action) => {
  const updatedStore = action.payload.store; // Access the store from payload
  const index = state.AllStoreData.stores.findIndex(store => store.id === updatedStore.id);
  if (index !== -1) {
    state.AllStoreData.stores[index] = updatedStore;
    if (state.StoreProfile && state.StoreProfile.id === updatedStore.id) {
      state.StoreProfile = updatedStore;
    }
  }
})

      .addCase(getSingleStore.fulfilled, (state, action) => {
        state.StoreProfile = action.payload;
      })

    // **********INVOICE*************


    .addCase(getAllInvoices.fulfilled, (state, action) => {
      state.AllInvoiceData = action.payload;
    })

    .addCase(createInvoices.fulfilled, (state, action) => {
      state.CreateInvoices = action.payload;
    })

    .addCase(getBalance.fulfilled, (state, action) => {
      state.BalanceStore = action.payload;
    })

    // *************TRANSACTIONS***********

.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.AllTransactions = action.payload;
    })

    // **************RETURN****************

    .addCase(getAllReturn.fulfilled, (state, action) => {
     
      state.AllReturns = action.payload;
    })

    // ***********EXPENSES************

    .addCase(getAllExpenses.fulfilled, (state, action) => {
     
      state.AllExpenses = action.payload;
    })

    // .addCase(expenseStatusChange.fulfilled, (state, action) => {
    //   const updateExicutive = action.payload.expense; // Assuming the payload contains the updated executive
    //   const index = state.AllExpenses.expenses.findIndex(expense => expense.id === updateExicutive.id);
    //   if (index !== -1) {
    //     state.AllExpenses.expenses[index] = updateExicutive;
    //     if (state.ExecutiveProfile && state.ExecutiveProfile.id === updateExicutive.id) {
    //       state.ExecutiveProfile = updateExicutive;
    //     }
    //   }
    // })

    .addCase(expenseStatusApprove.fulfilled, (state, action) => {
     
      state.ExpenseStatusApprove = action.payload;
    })

    .addCase(expenseStatusReject.fulfilled, (state, action) => {
     
      state.ExpenseStatusReject = action.payload;
    })

  },
});

export default adminSlice.reducer;
