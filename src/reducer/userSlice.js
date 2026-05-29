import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";

export const GetUserData = createAsyncThunk(
  "getuser/GetUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseurl}get_details/${localStorage.getItem("_id")}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data.Details; // Success response
    } catch (err) {
      console.error("Error editing staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const EdituserData = createAsyncThunk(
  "getuser/EdituserData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseurl}update_details/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data; // Success response
    } catch (err) {
      console.error("Error tretment staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

const userSlice = createSlice({
  name: "getuser",
  initialState: {
    getuser: {},
    loading: false,
    error: null,
  },
  reducers: {
    // addhospital: (state, action) => {
    //     state.HospitalDataSlice.push(action.payload)
    // },
    // editstaff: (state, action) => {
    // }
  },
  extraReducers: (builder) => {
    builder
      //  get the user data
      .addCase(GetUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.getuser = action.payload;
      })
      .addCase(GetUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit a tretment user
      .addCase(EdituserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EdituserData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // // Update the staff list with the edited user
        // state.getuser = state.getuser.map((user) =>
        //     user._id === updatedUser.id ? updatedUser : user
        // );
      })
      .addCase(EdituserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default userSlice.reducer;
