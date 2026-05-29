import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"

export const GetAllNewPermission = createAsyncThunk('NewPermissions/GetAllNewPermission', async () => {
    try {
        const response = await axios.get(`${baseurl}get_all_dashboard_endPoints`);
        return response.data.endPoints;
       
    } catch (error) {
        console.error("Error fetching staff users:", error.response?.data || error.message);
        throw error; // Rethrow to propagate the error in createAsyncThunk
    }
});
export const NewUpdatePermission = createAsyncThunk('NewPermissions/NewUpdatePermission',
    async (object, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${baseurl}updateDashboardPermission`, object);
            return response.data; // Success response
        } catch (err) {
            console.error("Error editing staff user:", err.response?.data?.message);
            return rejectWithValue(
                err.response?.data || { message: "An unknown error occurred" }
            );
        }
    });

const NewpermissionSection = createSlice({
    name: 'NewPermissions',
    initialState: {
        NewPermissions: [],
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetAllNewPermission.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(GetAllNewPermission.fulfilled, (state, action) => {
                state.loading = false;
                state.NewPermissions = action.payload
            })
            .addCase(GetAllNewPermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit a Hospital data
            .addCase(NewUpdatePermission.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(NewUpdatePermission.fulfilled, (state, action) => {
                state.loading = false;
                state.NewPermissions = action.payload
                // const updatedUser = action.payload;

                // // Update the staff list with the edited user
                // state.hospital = state.hospital.map((user) =>
                //     user.id === updatedUser.id ? updatedUser : user
                // );
            })
            .addCase(NewUpdatePermission.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    }
})
export default NewpermissionSection.reducer
// export const { addhospital } = HospitalDataSlice.actions
