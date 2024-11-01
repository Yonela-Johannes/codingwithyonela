import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
  tasks: [],
  messages: [],
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
  created: false,
  fetched: false,
}

export const getAllTasks = createAsyncThunk('tasks/fetch all', async (project_id) =>
{
  const response = await axios.get(`${apiUrl}task/${project_id}`);
  return response.data;
});

export const updateTask = createAsyncThunk('tasks/edit', async (data) =>
{
  const response = await axios.put(`${apiUrl}task/${data?.task_id}`, { ...data },
    {
      headers: headers
    });
  return response.data;
});

export const createTask = createAsyncThunk('tasks/create', async (data) =>
{
  await axios.post(`${apiUrl}task/${data?.project_id}`, data,
    {
      headers: headers
    })
    .then((response) => response.data)
    .catch(({ response }) =>
    {
      if (response.status == 401)
      {
        // localStorage.removeItem("persist:user")
        // window.location.reload()
      }
    })
});

export const deleteTask = createAsyncThunk('tasks/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}task/${data?.task_id}`, {
    data: {
      ...data
    }
  });
  return response.data;
});

export const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setSelecteTask: (state, action) =>
    {
      state.project = action.payload
    },
    getSelectedTask: (state) =>
    {
      state.project
    },
    disableTaskUpdates: (state) =>
    {
      state.created = false
      state.updated = false
      state.deleted = false
      state.fetched = false
    }
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllTasks.pending, (state) =>
      {
        state.loading = true;
        state.fetched = false;
      })
      .addCase(getAllTasks.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.tasks = action.payload;
        state.fetched = true;
      })
      .addCase(getAllTasks.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
        state.fetched = false;
      })
      .addCase(createTask.pending, (state) =>
      {
        state.success = false
        state.created = false
      })
      .addCase(createTask.fulfilled, (state) =>
      {
        state.success = true
        state.created = true
      })
      .addCase(createTask.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.created = false
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

export const { setSelecteTask, getSelectedTask, disableTaskUpdates } = tasksSlice.actions
export default tasksSlice.reducer