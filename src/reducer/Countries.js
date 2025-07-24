import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { baseurl } from "../Basurl/Baseurl"
export const GetAllCountries = createAsyncThunk('Countries/GetAllCountries', async () => {
  try {
    const response = await axios.get(`${baseurl}getCountries`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching staff users:", error.response?.data || error.message);
    throw error; // Rethrow to propagate the error in createAsyncThunk
  }
})
export const GetAllCountries2 = createAsyncThunk('Countries/GetAllCountries', async () => {
  try {
    const response = await axios.get(`${baseurl}getActiveCountries`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
     console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.error("Error fetching staff users:", error.response?.data || error.message);
    throw error; // Rethrow to propagate the error in createAsyncThunk
  }
})
export const AddCountry = createAsyncThunk(
  "Countries/AddCountry",
  async (object, { rejectWithValue }) => {
      try {
          const response = await axios.post(`${baseurl}addCountry`, object, {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
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
const CountriesSlice = createSlice({
  name: 'Countries',
  initialState: {
    Countries: [],
    loading: false,
    error: null
  },
  reducers: {
    addCountries: (state, action) => {
      state.CountriesSlice.push(action.payload)
    },
     
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllCountries.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(GetAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.Countries = action.payload
      })
      .addCase(GetAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  }


})
export default CountriesSlice.reducer
export const { addCountries } = CountriesSlice.actions