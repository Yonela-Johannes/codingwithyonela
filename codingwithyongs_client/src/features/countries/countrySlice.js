import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  countries: [],
  loading: false
}
  
  export const getAllCountries = createAsyncThunk('countries/fetch all', async () => {
    const response = await axios.get(`${apiUrl}countries`);
    return response.data;
  });

export const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.countries = action.payload.data;
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default countrySlice.reducer