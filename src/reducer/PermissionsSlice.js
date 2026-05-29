import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"

export const GetAllPermission = createAsyncThunk('Permissions/GetAllPermission', async () => {
    try {
        const response = await axios.get(`${baseurl}get_all_endPoints`);
        return response.data.endPoints;
    } catch (error) {
        console.error("Error fetching staff users:", error.response?.data || error.message);
        throw error; // Rethrow to propagate the error in createAsyncThunk
    }
});
export const UpdatePermission = createAsyncThunk('Permissions/UpdatePermission',
    async (object, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseurl}updatePermission`, object);
            return response.data; // Success response
        } catch (err) {
            console.error("Error editing staff user:", err.response?.data?.message);
            return rejectWithValue(
                err.response?.data || { message: "An unknown error occurred" }
            );
        }

    });


const permissionSection = createSlice({
    name: 'Permissions',
    initialState: {
        Permissions: [],
        loading: false,
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllPermission.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAllPermission.fulfilled, (state, action) => {
                state.loading = false;
                state.Permissions = action.payload
            })
            .addCase(GetAllPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit a Hospital data
            .addCase(UpdatePermission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UpdatePermission.fulfilled, (state, action) => {
                state.loading = false;
                state.Permissions = action.payload
                // const updatedUser = action.payload;

                // // Update the staff list with the edited user
                // state.hospital = state.hospital.map((user) =>
                //     user.id === updatedUser.id ? updatedUser : user
                // );
            })
            .addCase(UpdatePermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


    }
})
export default permissionSection.reducer
// export const { addhospital } = HospitalDataSlice.actions
