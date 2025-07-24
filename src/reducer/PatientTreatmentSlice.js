import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";

export const GetPatientTreatments = createAsyncThunk(
  "PatientTreatments/GetPatientTreatments",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}get_patient/${object.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.detail; // Success response
    } catch (err) {
      console.error("Error editing staff user:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const AddTretmentForPatient = createAsyncThunk(
  "PatientTreatments/AddTretmentForPatient",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}create_treatment`, object, {
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
export const AddHospitalForPatient = createAsyncThunk(
  "PatientTreatments/AddHospitalForPatient",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}assign_patient_to_hospital/${object.id}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const AppointmentForPatient = createAsyncThunk(
  "PatientTreatments/AppointmentForPatient",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}create_appointment/${localStorage.getItem("_id")}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const AddKysDetail = createAsyncThunk(
  "PatientTreatments/AddKysDetail",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}patient_Kyc_details/${formData.id}`,
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
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const ExtraServices = createAsyncThunk(
  "PatientTreatments/ExtraServices",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}patient_extra_service/${object.id}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const AddNewTretmentPayment = createAsyncThunk(
  "PatientTreatments/AddNewTretmentPayment",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}add_new_treatment_payment/${object.id}`,
        object,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data; // Success response
    } catch (error) {
      console.error("Error adding staff user:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
// export const TritmentStatus = createAsyncThunk(
//     "PatientTreatments/TritmentStatus",
//     async (object, { rejectWithValue }) => {
//       try {
//         const token = localStorage.getItem("token");

//         if (!token) {
//           throw new Error("Authorization token is missing");
//         }

//         const response = await axios.post(
//           `${baseurl}update_patient_treatment_status/${object.id}`,
//           { status: object.status }, // Ensure you're passing the correct payload
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         return response.data; // Success response
//       } catch (err) {
//         console.error("Error editing Enquiry status:", err.response?.data?.message);
//         return rejectWithValue(
//           err.response?.data || { message: "An unknown error occurred" }
//         );
//       }
//     }
//   );

const PatientTreatmentSlice = createSlice({
  name: "PatientTreatments",
  initialState: {
    PatientTreatments: {},
    loading: false,
    error: null,
  },
  reducers: {
    addPatientTre: (state, action) => {
      state.PatientTreatmentSlice.push(action.payload);
    },
    addHospital: (state, action) => {
      state.PatientTreatmentSlice.push(action.payload);
    },
    addAppointment: (state, action) => {
      state.PatientTreatmentSlice.push(action.payload);
    },
    addKYc: (state, action) => {
      state.PatientTreatmentSlice.push(action.payload);
    },
    Exservice: (state, action) => {
      state.PatientTreatmentSlice.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetPatientTreatments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetPatientTreatments.fulfilled, (state, action) => {
        state.loading = false;
        state.PatientTreatments = action.payload;
      })
      .addCase(GetPatientTreatments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //Status Enquiry update
    //   .addCase(TritmentStatus.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(TritmentStatus.fulfilled, (state, action) => {
    //     state.loading = false;
    //     const updatedUser = action.payload;

    //     // Update the staff list with the edited user
    //     state.PatientTreatments = state.PatientTreatments.
    //     treatments
    //     map((user) =>
    //       user.patientId
    //     === updatedUser.patientId
    //     ? updatedUser : user
    //     );
    //   })
    //   .addCase(TritmentStatus.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   })
  },
});
export default PatientTreatmentSlice.reducer;
export const { addPatientTre } = PatientTreatmentSlice.actions;
export const { addHospital } = PatientTreatmentSlice.actions;
export const { addAppointment } = PatientTreatmentSlice.actions;
export const { addKYc } = PatientTreatmentSlice.actions;
export const { Exservice } = PatientTreatmentSlice.actions;
