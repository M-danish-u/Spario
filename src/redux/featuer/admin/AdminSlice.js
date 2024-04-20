import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {
  createExecutiveAPI,
  createInvoiceAPI,
  createRouteAPI,
  createStoreAPI,
  getAdminDashboardAPI,
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
  async (body) => {
    try {
      // Validate body parameter here if necessary

      const response = await axios.post(createInvoiceAPI, body);
      //   console.log(response.data,'rrrrrrrr');
      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
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
  async (body) => {
    try {
      // Validate body parameter here if necessary

      const response = await axios.post(createExecutiveAPI, body);
      //   console.log(response.data,'rrrrrrrr');
      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
    }
  }
);

//   edit exicutive

export const editExicutive = createAsyncThunk(
  "admin/editExicutive",
  async ({ id, data }) => {
    try {
      // Validate parameters here if necessary

      const response = await axios.put(`${updateExecutiveAPI}/${id}`, data);
      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
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

// create route

export const createStore = createAsyncThunk(
  "admin/createStore",
  async (body) => {
    try {
      // Validate body parameter here if necessary

      const response = await axios.post(createStoreAPI, body);
      //   console.log(response.data,'rrrrrrrr');

      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
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

//    get  executive profile

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
  async ({ id, data }) => {
    try {
      // Validate parameters here if necessary

      const response = await axios.put(`${updateStoreAPI}/${id}`, data);
      console.log(response.data,'resss');
      return response.data;
    } catch (error) {
      // Handle error based on your application's needs
      throw error;
    }
  }
);

// ***********************TRANSACTIONS********************

//   get executive

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
      })

      .addCase(getSingleExecutive.fulfilled, (state, action) => {
        state.ExecutiveProfile = action.payload;
      })
      .addCase(editExicutive.fulfilled, (state, action) => {
        state.UpdateExicutive = action.payload;
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
      })

      .addCase(getSingleRouteStore.fulfilled, (state, action) => {
        state.RouteStoresProfile = action.payload;
      })

      // **********STORE**********

      .addCase(createStore.fulfilled, (state, action) => {
        state.Store = action.payload;
      })

      .addCase(getAllStores.fulfilled, (state, action) => {
        state.AllStoreData = action.payload;
      })
      .addCase(editStore.fulfilled, (state, action) => {
        state.UpdateStore = action.payload;
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
  },
});

export default adminSlice.reducer;
