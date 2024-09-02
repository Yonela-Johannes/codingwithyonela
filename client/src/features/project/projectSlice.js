import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
  projects: [],
  project: {},
  messages: [],
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
  create_project_message: false
}

export const getAllprojects = createAsyncThunk('projects/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}project`);
  return response.data;
});

export const getProject = createAsyncThunk('projects/fetch One', async (id) =>
{
  const response = await axios.get(`${apiUrl}project/${id}`);
  return response.data;
});

export const createProject = createAsyncThunk('projects/create', async (data) =>
{
  await axios.post(`${apiUrl}project`, data,
    {
      headers: formHeaders
    }
  )
    .then((response) => response.data)
    .catch(({ response }) =>
    {
      if (response.status == 401)
      {
        localStorage.removeItem("persist:user")
        window.location.reload()
      }
    })
});

export const deleteProject = createAsyncThunk('projects/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}project/${data?.account_id}`, {
    headers: headers,
    data: JSON.stringify(data)
  });
  return response.data;
});


export const getProjectMessages = createAsyncThunk('project comments/fetch One', async (id) =>
{
  const response = await axios.get(`${apiUrl}project-chat/${id}`);
  return response.data;
});

export const createProjectMessage = createAsyncThunk('projects/chat', async (data) =>
{
  await axios.post(`${apiUrl}project-chat/${data?.project_id}`, data)
    .then((response) => response.data)
    .catch(({ response }) =>
    {
      if (response.status == 401)
      {
        localStorage.removeItem("persist:user")
        window.location.reload()
      }
    })
});

export const likeProject = createAsyncThunk('projects/like', async (id) =>
{
  await axios.post(`${apiUrl}project-like/${id}`)
    .then((response) => response.data)
    .catch(({ response }) =>
    {
      if (response.status == 401)
      {
        localStorage.removeItem("persist:user")
        window.location.reload()
      }
    })
});

export const updateProject = createAsyncThunk('project/edit', async (data) =>
{
  const response = await axios.put(`${apiUrl}project/${data?.project_id}`, { ...data },
    {
      headers: formHeaders
    });
  return response.data;
});

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    disableMessageUpdate(state)
    {
      state.loading = false
      state.success = false
      state.failed = false
      state.deleted = false
      state.updated = false
      state.create_project_message = false
    },
    setSelectProject: (state, action) =>
    {
      state.project = action.payload
    },
    getSelectProject: (state) =>
    {
      state.project
    }
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllprojects.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllprojects.fulfilled, (state, action) =>
      {
        console.log(action.payload)
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllprojects.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createProject.pending, (state) =>
      {
        state.success = false
      })
      .addCase(createProject.fulfilled, (state) =>
      {
        state.success = true
      })
      .addCase(createProject.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(deleteProject.pending, (state) =>
      {
        state.deleted = false
      })
      .addCase(deleteProject.fulfilled, (state) =>
      {
        state.deleted = true
      })
      .addCase(deleteProject.rejected, (state, action) =>
      {
        state.error = action.message;
        state.deleted = false
      })
      .addCase(createProjectMessage.pending, (state) =>
      {
        state.success = false
        state.create_project_message = false
      })
      .addCase(createProjectMessage.fulfilled, (state) =>
      {
        state.success = true
        state.create_project_message = true
      })
      .addCase(createProjectMessage.rejected, (state, action) =>
      {
        state.create_project_message = false
        state.error = action.message;
        state.success = false
      })
      .addCase(getProject.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) =>
      {
        state.project = action.payload.data;
      })
      .addCase(getProject.rejected, (state, action) =>
      {
        state.error = action.message;
      })
      .addCase(getProjectMessages.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getProjectMessages.fulfilled, (state, action) =>
      {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(getProjectMessages.rejected, (state, action) =>
      {
        state.loading = false;
      })
      .addCase(likeProject.pending, (state) =>
      {
        state.success = false
      })
      .addCase(likeProject.fulfilled, (state) =>
      {
        state.success = true
      })
      .addCase(likeProject.rejected, (state, action) =>
      {
        state.error = action.message;
        state.success = false
      })
      .addCase(updateProject.pending, (state) =>
      {
        state.success = false
        state.updated = false
      })
      .addCase(updateProject.fulfilled, (state) =>
      {
        state.success = true
        state.updated = true
      })
      .addCase(updateProject.rejected, (state, action) =>
      {
        state.error = action.message;
        state.success = false
        state.updated = false
      })
  },
})

export const { setSelectProject, getSelectProject, disableMessageUpdate } = projectSlice.actions
export default projectSlice.reducer