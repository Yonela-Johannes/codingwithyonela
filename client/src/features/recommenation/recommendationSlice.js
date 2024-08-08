import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
  recommendations: [],
  recommendation: {},
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
  created: false,
}

export const getAllRecommendations = createAsyncThunk('recommendations/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}recommendation`);
  return response.data;
});

export const getRecommendation = createAsyncThunk('recommendations/fetch One', async (id) =>
{
  const response = await axios.get(`${apiUrl}recommendation/${id}`);
  return response.data;
});

export const updateRecommendation = createAsyncThunk('recommendations/update', async (data) =>
{
  const response = await axios.put(`${apiUrl}recommendation/${data?.account_id}`, data);
  return response.data;
});

export const deleteRecommendation = createAsyncThunk('recommendations/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}recommendation/${data?.account_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  });
  return response.data;
});

export const createRecommendation = createAsyncThunk('recommendations/create', async (data) =>
{
  const response = await axios.post(`${apiUrl}recommendation`, data, {
    headers: formHeaders
  });
  return response.data;
});

export const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    disableRecommendationUpdates(state)
    {
      state.created = false
      state.success = false
      state.updated = false
      state.deleted = false
      state.loading = false
    }
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllRecommendations.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllRecommendations.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.recommendations = action.payload.data;
      })
      .addCase(getAllRecommendations.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(updateRecommendation.pending, (state) =>
      {
        state.loading = true
        state.updated = false
      })
      .addCase(updateRecommendation.fulfilled, (state) =>
      {
        state.loading = false
        state.updated = true
        state.failed = false
      })
      .addCase(updateRecommendation.rejected, (state, action) =>
      {
        state.loading = false
        state.error = action.message;
        state.failed = true
        state.updated = false
      })
      .addCase(deleteRecommendation.pending, (state) =>
      {
        state.loading = true;
        state.success = false
        state.deleted = false
      })
      .addCase(deleteRecommendation.fulfilled, (state) =>
      {
        state.loading = false;
        state.deleted = true
        state.failed = false
      })
      .addCase(deleteRecommendation.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
        state.deleted = false
        state.failed = true
        state.success = false
      })
      .addCase(createRecommendation.pending, (state) =>
      {
        state.created = false
        state.loading = true;
        state.success = false
      })
      .addCase(createRecommendation.fulfilled, (state) =>
      {
        state.created = true
        state.loading = false;
        state.success = true
        state.failed = false
      })
      .addCase(createRecommendation.rejected, (state, action) =>
      {
        state.created = false
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(getRecommendation.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getRecommendation.fulfilled, (state, action) =>
      {
        state.loading = false;
        console.log(action.payload)
        state.recommendation = action.payload.data;
      })
      .addCase(getRecommendation.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export const { disableRecommendationUpdates } = recommendationSlice.actions
export default recommendationSlice.reducer