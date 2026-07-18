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

export const listSubscriptionPlans = createAsyncThunk(
  "payment/listSubscriptionPlans",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const response = await axios.get(`${url}/payment/plans`, headers);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get subscription plans", { position: "top-center" });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const getUserSubscription = createAsyncThunk(
  "payment/getUserSubscription",
  async (_, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const response = await axios.get(`${url}/payment/subscription/status`, headers);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to get subscription status", { position: "top-center" });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const activateSubscription = createAsyncThunk(
  "payment/activateSubscription",
  async (payload, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const response = await axios.post(`${url}/payment/subscription/activate`, payload, headers);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to activate subscription", { position: "top-center" });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

export const cancelSubscription = createAsyncThunk(
  "payment/cancelSubscription",
  async (payload, { rejectWithValue }) => {
    try {
      const headers = setHeaders();
      const response = await axios.post(`${url}/payment/subscription/cancel`, payload, headers);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel subscription", { position: "top-center" });
      return rejectWithValue(error.response?.data || { message: error.message });
    }
  }
);

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
      .addCase(listSubscriptionPlans.pending, (state) => {
        state.status = "pending";
      })
      .addCase(listSubscriptionPlans.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload || [];
      })
      .addCase(listSubscriptionPlans.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      })

      .addCase(getUserSubscription.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getUserSubscription.fulfilled, (state, action) => {
        state.status = "success";
        state.current = action.payload || null;
      })
      .addCase(getUserSubscription.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      })

      .addCase(activateSubscription.pending, (state) => {
        state.status = "pending";
      })
      .addCase(activateSubscription.fulfilled, (state, action) => {
        state.status = "success";
        state.current = action.payload || null;
      })
      .addCase(activateSubscription.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      })

      .addCase(cancelSubscription.pending, (state) => {
        state.status = "pending";
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        state.status = "success";
        state.current = action.payload || null;
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      })

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
