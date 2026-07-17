import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "./api";
import { toast } from "react-toastify";

const initialState = {
  profile: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const headers = setHeaders();
    const response = await axios.get(`${url}/auth/me`, headers);
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to load profile", { position: "top-center" });
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.profile = action.payload.data || null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload?.message || action.error?.message;
      });
  },
});

export default userSlice.reducer;
