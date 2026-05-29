import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "../Basurl/Baseurl";

export const GetAllcurrency = createAsyncThunk(
  "currency/GetAllCurrency",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseurl}getCurrency`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const AddMulCurrency = createAsyncThunk(
  "currency/AddMulCurrency",
  async (object, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseurl}addCurrency`, object, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ======================================================
// EDIT SERVICE
// ======================================================
export const EditCurrency = createAsyncThunk(
  "Currency/EditCurrency",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${baseurl}update_service/${formData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ======================================================
// DELETE SERVICE
// ======================================================
export const DeleteCurrency = createAsyncThunk(
  "currency/DeleteCurrency",
  async (currencyId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseurl}deleteCurrencyById/${currencyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return currencyId; // return ID only
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// ======================================================
// SLICE
// ======================================================
const CurrencySlice = createSlice({
  name: "Currency",
  initialState: {
    currencyList: [],
    loading: false,
    error: null,
  },

  reducers: {
    addCurrencyLocal: (state, action) => {
      state.currencyList.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      // ================= GET CURRENCY =================
      .addCase(GetAllcurrency.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllcurrency.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyList = action.payload;
      })
      .addCase(GetAllcurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD SERVICE =================
      .addCase(AddMulCurrency.fulfilled, (state, action) => {
        state.currencyList.push(action.payload.data);
      })

      // ================= EDIT SERVICE =================
      .addCase(EditCurrency.fulfilled, (state, action) => {
        const updated = action.payload;

        state.currencyList = state.currencyList.map((currency) =>
          currency.id === updated.id ? updated : currency
        );
      })

      // ================= DELETE SERVICE =================
      .addCase(DeleteCurrency.fulfilled, (state, action) => {
        const deletedId = action.payload;
        state.currency = state.currency.filter(
          (currency) => currency.id !== deletedId
        );
      });
  },
});

export const { addCurrencyLocal } = CurrencySlice.actions;

export default CurrencySlice.reducer;
