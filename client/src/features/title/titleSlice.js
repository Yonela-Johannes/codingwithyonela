import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  titles: [],
  loading: false
}

export const getAllTitles = createAsyncThunk('titles/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}title`);
  return response.data;
});

export const titleSlice = createSlice({
  name: 'titles',
  initialState,
  reducers: {
  },

  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllTitles.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllTitles.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.titles = action.payload.data;
      })
      .addCase(getAllTitles.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default titleSlice.reducer