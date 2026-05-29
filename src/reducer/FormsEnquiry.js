import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AdminBaseUrl } from "../Basurl/Baseurl";

// ==================== THUNK ====================
export const testForms = createAsyncThunk(
  "testForms/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AdminBaseUrl}user_requests_via_app`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Something went wrong"
      );
    }
  }
);

// ==================== SLICE ====================
const FormsEnquiry = createSlice({
  name: "testForms",
  initialState: {
    testForms: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(testForms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(testForms.fulfilled, (state, action) => {
        state.loading = false;
        state.testForms = action.payload;
      })
      .addCase(testForms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default FormsEnquiry.reducer;
