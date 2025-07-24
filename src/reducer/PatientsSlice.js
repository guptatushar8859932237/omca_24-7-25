import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"

export const GetAllPatients = createAsyncThunk('patient/GetAllPatients', async () => {
  try {
    const response = await axios.get(`${baseurl}all_patients`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    return response.data.details;
  } catch (error) {
    console.error("Error fetching patient:", error.response?.data || error.message);
    throw error; // Rethrow to propagate the error in createAsyncThunk
  }
});
export const AddAllPatients = createAsyncThunk(
  "patient/AddAllPatients",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}register_patient/${localStorage.getItem("_id")}`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  })

  
export const EditPatientType = createAsyncThunk(
  "patient/EditPatient",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}update_patient/${object.id}`, object, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

        },
      });
      return response.data; // Success response
    } catch (err) {
      console.error("Error editing staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const DeletePatient = createAsyncThunk('patient/DeletePatient',
  async (patientId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${baseurl}deletePatient/${patientId.id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",

        },
      });
      return patientId; // Success response
    } catch (error) {
      console.error("Error deleting hospital:", error);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
)

export const PainDService = createAsyncThunk(
  "patient/PainDService",
  async (servipostdata, { rejectWithValue }) => {
    console.log(servipostdata, "Service Data")
    try {
      const response = await axios.post(`${baseurl}paid_service}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  })








export const StatusPatient = createAsyncThunk(
  "patient/StatusPatient",
  async (object, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.post(
        `${baseurl}update_patient_status/${object.id}`,
        { status: object.status }, // Ensure you're passing the correct payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Success response
    } catch (err) {
      console.error("Error editing patient status:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patient: [],
    loading: false,
    error: null
  },
  reducers: {
    addPatient: (state, action) => {
      state.staffUserslice.push(action.payload)
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllPatients.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(GetAllPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patient = action.payload
      })
      .addCase(GetAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Edit a patient user
      .addCase(EditPatientType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditPatientType.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.patient = state.patient.map((user) =>
          user.patientId === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(EditPatientType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delet a Patient data
      .addCase(DeletePatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeletePatient.fulfilled, (state, action) => {
        state.loading = false;
        const deletedHospitalId = action.payload;
        // Filter out the deleted hospital
        state.patient = state.patient.filter(
          (user) => user.patientId !== deletedHospitalId
        );
      })
      .addCase(DeletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Status Patient
      .addCase(StatusPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(StatusPatient.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.patient = state.patient.map((user) =>
          user.patientId === updatedUser.id ? updatedUser : user
        );
      })
      .addCase(StatusPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

  }
})
export default patientSlice.reducer
export const { addPatient } = patientSlice.actions