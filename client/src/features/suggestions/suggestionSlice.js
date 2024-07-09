import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  suggestions: {},
  suggestion: {},
  responses: [],
  comments: [],
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
}
  
  export const getAllSuggestions = createAsyncThunk('suggestions/fetch all', async () => {
    const response = await axios.get(`${apiUrl}suggestion`);
    return response.data;
  });

  export const getSuggestion = createAsyncThunk('suggestions/fetch One', async (id) => {
    const response = await axios.get(`${apiUrl}suggestion/${id}`);
    return response.data;
  });

  export const getSuggestionResponse = createAsyncThunk('suggestion response/fetch One', async (id) => {
    const response = await axios.get(`${apiUrl}suggestion-response/${id}`);
    return response.data;
  });

  export const updateSuggestion = createAsyncThunk('suggestions/update', async (data) => {
    const response = await axios.put(`${apiUrl}suggestion/${data?.account_id}`, data);
    return response.data;
  });

  export const createSuggestion = createAsyncThunk('suggestions/create', async (data) => {
    const response = await axios.post(`${apiUrl}suggestion`, data);
    return response.data;
  });

  export const deleteSuggestion = createAsyncThunk('suggestions/delete', async (data) => {
    const response = await axios.delete(`${apiUrl}suggestion/${data?.account_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    });
    return response.data;
  });

  export const commentSuggestion = createAsyncThunk('suggestions/comment', async (data) => {
    const response = await axios.post(`${apiUrl}comment-suggestion`, data);
    return response.data;
  });

  export const getSuggestionComments = createAsyncThunk('suggestion comments/fetch One', async (id) => {
    const response = await axios.get(`${apiUrl}suggestion-comments/${id}`);
    return response.data;
  });

  export const createSuggestionResponse = createAsyncThunk('suggestions/response', async (data) => {
    const response = await axios.post(`${apiUrl}suggestion-response`, data);
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
      })
      .addCase(updateSuggestion.pending, (state) => {
        state.loading = true
        state.updated = false
      })
      .addCase(updateSuggestion.fulfilled, (state) => {
        state.loading = false
        state.updated = true
        state.failed = false
      })
      .addCase(updateSuggestion.rejected, (state, action) => {
        state.loading = false
        state.error = action.message;
        state.failed = true
        state.updated = false
      })
      .addCase(createSuggestion.pending, (state) => {
        state.loading = true;
        state.success = false
      })
      .addCase(createSuggestion.fulfilled, (state) => {
        state.loading = false;
        state.success = true
        state.failed = false
      })
      .addCase(createSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(deleteSuggestion.pending, (state) => {
        state.loading = true;
        state.success = false
        state.deleted = false
      })
      .addCase(deleteSuggestion.fulfilled, (state) => {
        state.loading = false;
        state.deleted = true
        state.failed = false
      })
      .addCase(deleteSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.deleted = false
        state.failed = true
        state.success = false
      })
      .addCase(commentSuggestion.pending, (state) => {
        state.loading = true;
        state.success = false
      })
      .addCase(commentSuggestion.fulfilled, (state) => {
        state.loading = false;
        state.success = true
        state.failed = false
      })
      .addCase(commentSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(createSuggestionResponse.pending, (state) => {
        state.loading = true;
        state.success = false
      })
      .addCase(createSuggestionResponse.fulfilled, (state) => {
        state.loading = false;
        state.success = true
        state.failed = false
      })
      .addCase(createSuggestionResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(getSuggestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.suggestion = action.payload.data;
      })
      .addCase(getSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getSuggestionResponse.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getSuggestionResponse.fulfilled, (state, action) => {
        state.responses = action.payload.data;
        // state.loading = false;
      })
      .addCase(getSuggestionResponse.rejected, (state, action) => {
        // state.loading = false;
      })
      .addCase(getSuggestionComments.pending, (state) => {
        // state.loading = true;
      })
      .addCase(getSuggestionComments.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        // state.loading = false;
      })
      .addCase(getSuggestionComments.rejected, (state, action) => {
        // state.loading = false;
      })
  },
})

export default suggestionSlice.reducer