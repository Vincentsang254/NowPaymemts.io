import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  list: [],
  current: null,
  status: "idle",
  error: null,
};

export const createNowPayment = createAsyncThunk("payment/createNowPayment", async (payload, { rejectWithValue }) => {
  try {
    const headers = setHeaders();
    const response = await axios.post(`${url}/payment/nowpayments/create`, payload, headers);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create payment", { position: "top-center" });
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

export const getNowPaymentStatus = createAsyncThunk("payment/getNowPaymentStatus", async (paymentId, { rejectWithValue }) => {
  try {
    const headers = setHeaders();
    const response = await axios.get(`${url}/payment/nowpayments/${paymentId}/status`, headers);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to get payment status", { position: "top-center" });
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNowPayment.pending, (state) => {
        state.status = "pending";
      })
      .addCase(createNowPayment.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload?.data) state.current = action.payload.data;
      })
      .addCase(createNowPayment.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      })

      .addCase(getNowPaymentStatus.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getNowPaymentStatus.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload?.data) state.current = action.payload.data;
      })
      .addCase(getNowPaymentStatus.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      });
  },
});

export default paymentSlice.reducer;
