import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  questions: [],
  comments: [],
  question: {},
  loading: false,
  created: false,
  commented: false
}

export const getAllQuestions = createAsyncThunk('questions/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}question`);
  return response.data;
});

export const getQuestion = createAsyncThunk('question/fetch question', async (question_id) =>
{
  const response = await axios.get(`${apiUrl}question?id=${question_id}`);
  return response.data;
});

export const createQuestion = createAsyncThunk('question/create question', async (data) =>
{
  const response = await axios.post(`${apiUrl}question`, data);
  return response.data;
});

export const updateQuestion = createAsyncThunk('question/update', async (data) =>
{
  const response = await axios.put(`${apiUrl}question/${data?.account_id}`, data);
  return response.data;
});

export const createQuestionComment = createAsyncThunk('question comment/create question', async (data) =>
{
  const response = await axios.post(`${apiUrl}question-comment/${data?.question_id}`, data);
  return response.data;
});

export const getResponses = createAsyncThunk('question comment/fetch question', async (id) =>
{
  const response = await axios.get(`${apiUrl}question-comment/${id}`,);
  return response.data;
});

export const deleteQuestion = createAsyncThunk('question/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}question/${data?.account_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  });
  return response.data;
});

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllQuestions.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.questions = action.payload.data;
      })
      .addCase(getAllQuestions.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getQuestion.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.questions = action.payload.data;
      })
      .addCase(getQuestion.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createQuestion.pending, (state) =>
      {
        state.created = false;
      })
      .addCase(createQuestion.fulfilled, (state) =>
      {
        state.created = true;
      })
      .addCase(createQuestion.rejected, (state, action) =>
      {
        state.created = false;
        state.error = action.message;
      })
      .addCase(getResponses.rejected, (state, action) =>
      {
        state.error = action.message;
      })
      .addCase(getResponses.pending, (state) =>
      {

      })
      .addCase(getResponses.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
      })
      .addCase(createQuestionComment.rejected, (state, action) =>
      {
        state.commented = false;
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createQuestionComment.pending, (state) =>
      {
        state.commented = false;
      })
      .addCase(createQuestionComment.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.commented = true;
      })
      .addCase(updateQuestion.rejected, (state, action) =>
      {
        state.commented = false;
        state.loading = false;
        state.error = action.message;
      })
      .addCase(updateQuestion.pending, (state) =>
      {
        state.commented = false;
      })
      .addCase(updateQuestion.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.commented = true;
      })
      .addCase(deleteQuestion.rejected, (state, action) =>
      {
        state.commented = false;
        state.loading = false;
        state.error = action.message;
      })
      .addCase(deleteQuestion.pending, (state) =>
      {
        state.commented = false;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.commented = true;
      })
  },
})

export default questionSlice.reducer