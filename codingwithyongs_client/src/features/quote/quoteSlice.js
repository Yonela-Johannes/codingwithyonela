import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  quotes: [],
  loading: false,
  created: false,
}

export const getAllQuotes = createAsyncThunk('quotes/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}quote`);
  return response.data;
});


export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllQuotes.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllQuotes.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.quotes = action.payload.data;
      })
      .addCase(getAllQuotes.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default quoteSlice.reducer