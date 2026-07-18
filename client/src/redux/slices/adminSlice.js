import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "./api";

const initialState = {
  overview: null,
  users: [],
  payments: [],
  reports: null,
  loading: false,
  error: null,
};

const authHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token || ""}`,
  },
});

export const fetchAdminOverview = createAsyncThunk(
  "admin/fetchAdminOverview",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${url}/admin/overview`, authHeader(token));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load admin overview");
    }
  }
);

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchAdminUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${url}/admin/users`, authHeader(token));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load users");
    }
  }
);

export const fetchAdminPayments = createAsyncThunk(
  "admin/fetchAdminPayments",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${url}/admin/payments`, authHeader(token));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load payments");
    }
  }
);

export const fetchAdminReports = createAsyncThunk(
  "admin/fetchAdminReports",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(`${url}/admin/reports`, authHeader(token));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to load reports");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchAdminOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchAdminPayments.fulfilled, (state, action) => {
        state.payments = action.payload;
      })
      .addCase(fetchAdminReports.fulfilled, (state, action) => {
        state.reports = action.payload;
      });
  },
});

export default adminSlice.reducer;
