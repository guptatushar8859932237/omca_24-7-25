import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";

export const GetAllEnquiry = createAsyncThunk(
  "Enquiry/GetAllEnquiry",
  async () => {
    try {
      const response = await axios.get(`${baseurl}all_Enq`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.details;
    } catch (error) {
      console.error(
        "Error fetching staff users:",
        error.response?.data || error.message
      );
      // throw error; // Rethrow to propagate the error in createAsyncThunk
    }
  }
);

export const DeleteEnquiry = createAsyncThunk(
  "patient/DeleteEnquiry",
  async (e, { rejectWithValue }) => {
    console.log(e);
    try {
      const response = await axios.delete(
        `${baseurl}deleteEnquiry/${e.id.enquiryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return e.id.patientId; // Success response
    } catch (error) {
      console.error("Error deleting Enquiry:", error);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

// export const AddEnquirys = createAsyncThunk(
//   "Enquiry/AddEnquiry",
//   async (object, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `${baseurl}add_new_enq/${localStorage.getItem("_id")}`,
//         object,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data; // Success response
//     } catch (error) {
//       console.error("Error adding staff user:", error.response?.data?.message);
//       return rejectWithValue(
//         error.response?.data || { message: "An unknown error occurred" }
//       );
//     }
//   }
// );
// export const AddEnquirys = createAsyncThunk(
//   "enquiry/add",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post("/api/enquiry", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
export const AddEnquirys = createAsyncThunk(
  "Enquiry/AddEnquiry",
  async (formData, { rejectWithValue }) => {
    console.log(formData)
    try {
      const response = await axios.post(
        `${baseurl}add_new_enq/${localStorage.getItem("_id")}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data", // ✅ Required for FormData
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding enquiry:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

// export const EditEnquiryType = createAsyncThunk(
//   "Enquiry/EditEnquiryType",
//   async (enquiryId, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(
//         `${baseurl}update_enq/${enquiryId.id}`,
//         enquiryId,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data; // Success response
//     } catch (err) {
//       console.error("Error editing staff user:", err.response?.data?.message);
//       return rejectWithValue(
//         err.response?.data || { message: "An unknown error occurred" }
//       );
//     }
//   }
// );
// export const EditEnquiryType = createAsyncThunk(
//   "Enquiry/EditEnquiryType",
//   async (data, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       // Append all fields to formData
//       for (const key in data) {
//         if (data[key] !== undefined && data[key] !== null) {
//           formData.append(key, data[key]);
//         }
//       }

//       const response = await axios.put(
//         `${baseurl}update_enq/${data.id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             // Do not set Content-Type; let Axios handle it for multipart/form-data
//           },
//         }
//       );

//       return response.data;
//     } catch (err) {
//       console.error("Error editing enquiry:", err.response?.data?.message || err.message);
//       return rejectWithValue(
//         err.response?.data || { message: "An unknown error occurred" }
//       );
//     }
//   }
// );
export const EditEnquiryType = createAsyncThunk(
  "Enquiry/EditEnquiryType",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseurl}update_enq/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error("Error editing enquiry:", err.response?.data?.message || err.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const EnquiryStatus = createAsyncThunk(
  "Enquiry/StatusPatient",
  async (object, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authorization token is missing");
      }

      const response = await axios.post(
        `${baseurl}update_Enquiry_status/${object.id}`,
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
      console.error(
        "Error editing Enquiry status:",
        err.response?.data?.message
      );
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

export const EnquirySample = createAsyncThunk(
  "Enquiry/EnquirySample",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}generate_sampleFile`, {
        responseType: "blob", // Important for downloading files
      });

      // Create a downloadable link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Sample_Enquiry.xlsx"); // File name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return response.data; // Success response
    } catch (err) {
      console.error(
        "Error downloading the sample file:",
        err.response?.data?.message || err.message
      );
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);
export const ImportEnquirys = createAsyncThunk(
  "Enquiry/ImportEnquirys",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseurl}import_file/${localStorage.getItem("_id")}`,
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
const EnquirySlice = createSlice({
  name: "Enquiry",
  initialState: {
    Enquiry: [],
    loading: false,
    error: null,
  },
  reducers: {
    addEnquiry: (state, action) => {
      state.EnquirySlice.push(action.payload);
    },
    //   editstaff: (state, action) => {

    //   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.Enquiry = action.payload;
      })
      .addCase(GetAllEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(DeleteEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        const deleteEnquiryId = action.payload;
        // Filter out the deleted hospital
        console.log(state.patient, deleteEnquiryId);
        // state.patient = state.enquir.filter(
        //   (user) => user.patientId !== deleteEnquiryId
        // );
      })
      .addCase(DeleteEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit a staff user
      .addCase(EditEnquiryType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditEnquiryType.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.Enquiry = state.Enquiry.map((user) =>
          user.enquiryId === updatedUser.enquiryId ? updatedUser : user
        );
      })
      .addCase(EditEnquiryType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Status Enquiry update
      .addCase(EnquiryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EnquiryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // Update the staff list with the edited user
        state.Enquiry = state.Enquiry.map((user) =>
          user.enquiryId === updatedUser.enquiryId ? updatedUser : user
        );
      })
      .addCase(EnquiryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //sampal file
      .addCase(EnquirySample.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EnquirySample.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(EnquirySample.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //import file
      .addCase(ImportEnquirys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ImportEnquirys.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(ImportEnquirys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default EnquirySlice.reducer;
export const { addEnquiry } = EnquirySlice.actions;
