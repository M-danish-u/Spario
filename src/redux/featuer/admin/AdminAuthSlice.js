import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {  loginAdminAPI } from "../../../api/url";

const initialState = {
  loading: false,
  error: null,
  admin: null ,
  token: localStorage.getItem("token") || null,

};






export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${loginAdminAPI}`, body);
      console.log(response.data, 'login response');
      return response.data;
    } catch (error) {
      console.error(error.response.data, 'checking the response from the backend');
      return rejectWithValue(error.response.data);
    }
  }
);




const adminauthSlice = createSlice({
  name: 'adminLogin',
  initialState,
  reducers: {
    // You can add your custom reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    

    .addCase(adminLogin.fulfilled, (state,action) => {
        state.loading = false;
        state.admin = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
        localStorage.setItem("role", action.payload.user.role); // Store token in local storage
      });
  }
});

export default adminauthSlice.reducer;
