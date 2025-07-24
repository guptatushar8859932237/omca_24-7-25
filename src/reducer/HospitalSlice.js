import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"


export const GetAllHositalData = createAsyncThunk('hospital/GetAllHositalData', async () => {
    try {
        const response = await axios.get(`${baseurl}getAll_hospital`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        return response.data.Hospital_Details;
    } catch (error) {
        console.error("Error fetching staff users:", error.response?.data || error.message);
        throw error; // Rethrow to propagate the error in createAsyncThunk
    }
});

export const AddHospitalData = createAsyncThunk(
    "hospital/AddAllStaffuser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseurl}add_hospital`, formData, {
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
    }
);
export const EditHospital = createAsyncThunk(
    "hospital/EditStaffUser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${baseurl}update_Hospital_Details/${formData.id}`, formData, {
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

export const DeleteHospital = createAsyncThunk('hospital/DeleteHospital',
    async (hospitalId, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${baseurl}delete_hospital/${hospitalId.id}`,   {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                     
                },
            });
            return hospitalId; // Success response
        } catch (error) {
            console.error("Error deleting hospital:", error);
      return rejectWithValue(
        error.response?.data || { message: "An unknown error occurred" }
      );
        }
    }
)

const HospitalDataSlice = createSlice({
    name: 'hospital',
    initialState: {
        hospital: [],
        loading: false,
        error: null
    },
    reducers: {
        addhospital: (state, action) => {
            state.HospitalDataSlice.push(action.payload)
        },
        // editstaff: (state, action) => {

        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllHositalData.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAllHositalData.fulfilled, (state, action) => {
                state.loading = false;
                state.hospital = action.payload
            })
            .addCase(GetAllHositalData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit a Hospital data
            .addCase(EditHospital.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditHospital.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUser = action.payload;

                // Update the staff list with the edited user
                state.hospital = state.hospital.map((user) =>
                    user.id === updatedUser.id ? updatedUser : user
                );
            })
            .addCase(EditHospital.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delet a Hospital data
            .addCase(DeleteHospital.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(DeleteHospital.fulfilled, (state, action) => {
                state.loading = false;
                const deletedHospitalId = action.payload;
                // Filter out the deleted hospital
                state.hospital = state.hospital.filter(
                    (user) => user.hospitalId !== deletedHospitalId
                );
            })
            .addCase(DeleteHospital.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})
export default HospitalDataSlice.reducer
export const { addhospital } = HospitalDataSlice.actions
