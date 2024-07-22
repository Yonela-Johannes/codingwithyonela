import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  tasks: [],
  messages: [],
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
}

export const getAllTasks = createAsyncThunk('tasks/fetch all', async (project_id) =>
{
  const response = await axios.get(`${apiUrl}task/${project_id}`);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/edit', async (data) =>
{
  const response = await axios.put(`${apiUrl}project/${data?.project_id}`, { ...data });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (data) =>
{
  const response = await axios.post(`${apiUrl}project`, data);
  return response.data;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}project/${data?.account_id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(data)
  });
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelecteTask: (state, action) =>
    {
      state.project = action.payload
    },
    getSelectedTask: (state) =>
    {
      state.project
    }
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllTasks.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllTasks.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(getAllTasks.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createTask.pending, (state) =>
      {
        state.success = false
      })
      .addCase(createTask.fulfilled, (state) =>
      {
        state.success = true
      })
      .addCase(createTask.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(deleteTask.pending, (state) =>
      {
        state.deleted = false
      })
      .addCase(deleteTask.fulfilled, (state) =>
      {
        state.deleted = true
      })
      .addCase(deleteTask.rejected, (state, action) =>
      {
        state.error = action.message;
        state.deleted = false
      })
      .addCase(updateTask.pending, (state) =>
      {
        state.updated = false
        state.loading = true;
      })
      .addCase(updateTask.fulfilled, (state, action) =>
      {
        state.updated = true
        state.project = action.payload.data;
        state.loading = false;
      })
      .addCase(updateTask.rejected, (state, action) =>
      {
        state.error = action.message;
        state.updated = true
        state.loading = false;
      })
  },
})

export const { setSelecteTask, getSelectedTask } = tasksSlice.actions
export default tasksSlice.reducer