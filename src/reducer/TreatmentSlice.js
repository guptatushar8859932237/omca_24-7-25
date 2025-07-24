import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"


export const GetAllTreatment = createAsyncThunk('Treatment/GetAllTreatment', async () => {
    try {
        const response = await axios.get(`${baseurl}get_all_treatment_courses`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        console.log(response)
        return response.data.treatment_courses;
    } catch (error) {
        console.error("Error fetching staff users:", error.response?.data || error.message);
        throw error; // Rethrow to propagate the error in createAsyncThunk
    }
});

// export const AddTeatment = createAsyncThunk(
//     "Treatment/AddTeatment",
//     async (object, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${baseurl}/add_treatment_course`, object, {
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json", // Correct content type
//                 },
//             });
//             return response.data; // Success response
//         } catch (error) {
//             console.error("Error adding treatment:", error.response?.data?.message);
//             return rejectWithValue(
//                 error.response?.data || { message: "An unknown error occurred" }
//             );
//         }
//     }
// );
export const AddTeatment = createAsyncThunk(
  "Treatment/AddTeatment",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}/add_treatment_course`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data", // Very important for file upload
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error adding treatment:", error.response?.data?.message);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);

// export const EditTreatmentssection = createAsyncThunk(
//     "Treatment/EditTreatmentssection",
//     async (courseId, { rejectWithValue }) => {
//         try {
//             const response = await axios.put(`${baseurl}update_treatment_course/${courseId.id}`, courseId, {
//                 headers: {
//                     "Authorization": `Bearer ${localStorage.getItem("token")}`,
//                     "Content-Type": "application/json",

//                 },
//             });
//             return response.data; // Success response
//         } catch (err) {
//             console.error("Error tretment staff user:", err.response?.data?.message);
//             return rejectWithValue(
//                 err.response?.data || { message: "An unknown error occurred" }
//             );
//         }
//     }
// );

export const EditTreatmentssection = createAsyncThunk(
  "Treatment/EditTreatmentssection",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseurl}update_treatment_course/${id}`, data, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error treatment update:", err.response?.data?.message);
      return rejectWithValue(
        err.response?.data || { message: "An unknown error occurred" }
      );
    }
  }
);


export const DeleteTreatment = createAsyncThunk('Treatment/DeleteTreatment',
    async (treatment_course_id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseurl}delete_treatment_course/${treatment_course_id.id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",

                },
            });
            return treatment_course_id; // Success response
        } catch (error) {
            console.error("Error deleting hospital:", error);
            return rejectWithValue(
                error.response?.data || { message: "An unknown error occurred" }
            );
        }
    }
)
const TreatmentSlice = createSlice({
    name: 'Treatment',
    initialState: {
        Treatment: [],
        loading: false,
        error: null
    },
    reducers: {
        addTreatment: (state, action) => {
            state.TreatmentSlice.push(action.payload)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllTreatment.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAllTreatment.fulfilled, (state, action) => {
                state.loading = false;
                state.Treatment = action.payload
            })
            .addCase(GetAllTreatment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit a tretment user
            .addCase(EditTreatmentssection.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditTreatmentssection.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;

                // Update the staff list with the edited user
                state.Treatment = state.Treatment.map((user) =>
                    user.course_id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(EditTreatmentssection.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delet a Hospital data
            .addCase(DeleteTreatment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteTreatment.fulfilled, (state, action) => {
                state.loading = false;
                const deletedHospitalId = action.payload;
                // Filter out the deleted hospital
                state.Treatment = state.Treatment.filter(
                    (user) => user.course_id !== deletedHospitalId
                );
            })
            .addCase(DeleteTreatment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})
export default TreatmentSlice.reducer
export const { addTreatment } = TreatmentSlice.actions