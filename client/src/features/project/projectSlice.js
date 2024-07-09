import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  projects: [],
  project: {},
  messages: [],
  loading: false,
  success: false,
  failed: false,
  deleted: false,
  updated: false,
}
  
  export const getAllprojects = createAsyncThunk('projects/fetch all', async () => {
    const response = await axios.get(`${apiUrl}project`);
    return response.data;
  });

  export const getProject = createAsyncThunk('projects/fetch One', async (id) => {
    const response = await axios.get(`${apiUrl}project/${id}`);
    return response.data;
  });

  export const createProject = createAsyncThunk('projects/create', async (data) => {
    const response = await axios.post(`${apiUrl}project`, data);
    return response.data;
  });

  export const deleteProject = createAsyncThunk('projects/delete', async (data) => {
    const response = await axios.delete(`${apiUrl}project/${data?.account_id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(data)
    });
    return response.data;
  });


  export const getProjectMessages = createAsyncThunk('project comments/fetch One', async (id) => {
    console.log(id)
    const response = await axios.get(`${apiUrl}project-chat/${id}`);
    console.log(response)
    return response.data;
  });

  export const createProjectMessage = createAsyncThunk('projects/chat', async (data) => {
    const response = await axios.post(`${apiUrl}project-chat/${data?.project_id}`, data);
    return response.data;
  });

  export const likeProject = createAsyncThunk('projects/like', async (id) => {
    const response = await axios.post(`${apiUrl}project-like/${id}`);
    return response.data;
  });

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setSelectProject: (state, action) => {
      state.project = action.payload
    },
    getSelectProject: (state) => {
      state.project
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllprojects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllprojects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data;
      })
      .addCase(getAllprojects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createProject.pending, (state) => {
        state.success = false
      })
      .addCase(createProject.fulfilled, (state) => {
        state.success = true
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
        state.failed = true
        state.success = false
      })
      .addCase(deleteProject.pending, (state) => {
        state.deleted = false
      })
      .addCase(deleteProject.fulfilled, (state) => {
        state.deleted = true
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.message;
        state.deleted = false
      })
      .addCase(createProjectMessage.pending, (state) => {
        state.success = false
      })
      .addCase(createProjectMessage.fulfilled, (state) => {
        state.success = true
      })
      .addCase(createProjectMessage.rejected, (state, action) => {
        state.error = action.message;
        state.success = false
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProject.fulfilled, (state, action) => {
        console.log(action.payload)
        state.project = action.payload.data;
      })
      .addCase(getProject.rejected, (state, action) => {
        state.error = action.message;
      })
      .addCase(getProjectMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectMessages.fulfilled, (state, action) => {
        state.messages = action.payload.data;
        state.loading = false;
      })
      .addCase(getProjectMessages.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(likeProject.pending, (state) => {
        state.success = false
      })
      .addCase(likeProject.fulfilled, (state) => {
        state.success = true
      })
      .addCase(likeProject.rejected, (state, action) => {
        state.error = action.message;
        state.success = false
      })
  },
})

export const { setSelectProject, getSelectProject } = projectSlice.actions
export default projectSlice.reducer