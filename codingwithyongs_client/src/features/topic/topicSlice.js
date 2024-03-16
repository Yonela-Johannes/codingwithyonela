import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  topics: [],
  loading: false
}
  
  export const getAllTopics = createAsyncThunk('topics/fetch all', async () => {
    const response = await axios.get(`${apiUrl}topics`);
    console.log(response)
    return response.data;
  });

export const topicSlice = createSlice({
  name: 'topics',
  initialState,
  reducers: {
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.topics = action.payload.data;
      })
      .addCase(getAllTopics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default topicSlice.reducer