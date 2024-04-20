import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../api/axios";
import {  loginAdminAPI } from "../../../api/url";

const initialState = {
  loading: false,
  error: null,
  admin: null ,// Assuming you want to store university data upon login
  token: localStorage.getItem("token") || null, // Retrieve token from local storage

};






export const executiveLogin = createAsyncThunk("executiveLogin", async (body, thunkAPI) => {
  try {
    const response = await axios.post(`${loginAdminAPI}`, body);
    
    console.log(response.data,'looog');
    return response.data;
  } catch (error) {
    console.log(error.response.data,"its rejecerd")
    return thunkAPI.rejectWithValue(error.response.data);
  }
});



const executiveauthSlice = createSlice({
  name: 'executiveLogin',
  initialState,
  reducers: {
    // You can add your custom reducers here if needed
  },
  extraReducers: (builder) => {
    builder
    

    .addCase(executiveLogin.fulfilled, (state,action) => {
        state.loading = false;
        state.executive = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token); // Store token in local storage
      });
  }
});

export default executiveauthSlice.reducer;
