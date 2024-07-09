import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  categories: [],
  loading: false
}

export const getAllCategories = createAsyncThunk('categories/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}category`, {
    headers: {
      'Content-Type': 'application/jsonn;charset=utf-8'
    },
  });
  console.log(response)
  return response.data;
});

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllCategories.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) =>
      {
        state.loading = false;
        console.log(action.payload)
        state.categories = action.payload.data;
      })
      .addCase(getAllCategories.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default categorySlice.reducer