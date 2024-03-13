import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  suggestions: {},
  loading: false
}
  
  export const getAllSuggestions = createAsyncThunk('suggestions/fetch all', async () => {
    const response = await axios.get(`${apiUrl}suggestion`);
    return response.data;
  });

export const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.data;
      })
      .addCase(getAllSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      });
  },
})

export default suggestionSlice.reducer