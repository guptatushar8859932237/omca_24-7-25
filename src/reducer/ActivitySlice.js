import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseurl } from "../Basurl/Baseurl";
import axios from "axios";

// GET ALL ACTIVITY — API
export const GetAllActivity = createAsyncThunk(
  "Activity/GetAllActivity",
  async () => {
    try {
      const response = await axios.get(`${baseurl}getAllUserLogs`);
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching activity:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
);

const ActivitySlice = createSlice({
  name: "Activity",
  initialState: {
    Activity: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllActivity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.Activity = action.payload;
      })
      .addCase(GetAllActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default ActivitySlice.reducer;
