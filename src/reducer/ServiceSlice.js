import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";

export const GetAllServices = createAsyncThunk(
  "Services/GetAllServices",
  async () => {
    try {
      const response = await axios.get(`${baseurl}all_services`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.services;
    } catch (error) {
      console.error(
        "Error fetching staff users:",
        error.response?.data || error.message
      );
      throw error; // Rethrow to propagate the error in createAsyncThunk
    }
  }
);

export const AddMulServices = createAsyncThunk(
  "Services/AddMulServices",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}add_service`, object, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const Editservice = createAsyncThunk(
  "hospital/Editservice",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseurl}update_service/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (err) {
      console.error("Error editing staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const DeleteService = createAsyncThunk(
  "hospital/DeleteService",
  async (hospitalId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${baseurl}delete_service/${hospitalId.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return hospitalId; // Success response
    } catch (error) {
      console.error("Error deleting hospital:", error);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const ActiveService = createAsyncThunk(
  "Services/ActiveService",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}active_inactive_Service/${object.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (err) {
      console.error("Error editing staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
const GetServiceSlice = createSlice({
  name: "Service",
  initialState: {
    Service: [],
    loading: false,
    error: null,
  },
  reducers: {
    addServices: (state, action) => {
      state.GetServiceSlice.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllServices.fulfilled, (state, action) => {
        state.loading = false;
        state.Service = action.payload;
      })
      .addCase(GetAllServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Active inActive staff
      .addCase(ActiveService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ActiveService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.Service = state.Service.map((user) =>
          user.serviceId === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(ActiveService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Edit a  servisec data
      .addCase(Editservice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Editservice.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.hospital = state.hospital.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(Editservice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delet a service data
      .addCase(DeleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteService.fulfilled, (state, action) => {
        state.loading = false;
        const deletedHospitalId = action.payload;
        // Filter out the deleted hospital
        state.hospital = state.hospital.filter(
          (user) => user.hospitalId !== deletedHospitalId
        );
      })
      .addCase(DeleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default GetServiceSlice.reducer;
// export const { addServices } = AddMulServices.actions
