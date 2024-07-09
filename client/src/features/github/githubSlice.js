import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  github_user: {},
  github_users: [],
  my_repos: [],
  repos: [],
  followers: [],
  loading: false
}

export const getMyProfile = createAsyncThunk('profile github/my profile', async () =>
{
  const response = await axios.get(`${apiUrl}github/my-profile`);
  return response.data;
});

export const getMyRepos = createAsyncThunk('repos github/my repos', async () =>
{
  const response = await axios.get(`${apiUrl}github/my-repos`);
  return response.data;
});

export const getMyFollowers = createAsyncThunk('profile github/my followers', async () =>
{
  const response = await axios.get(`${apiUrl}github/my-followers`);
  return response.data;
});


export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
  },

  extraReducers: (builder) =>
  {
    builder
      .addCase(getMyProfile.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.github_user = action.payload.data;
      })
      .addCase(getMyProfile.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getMyRepos.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getMyRepos.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.my_repos = action.payload.data;
      })
      .addCase(getMyRepos.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getMyFollowers.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.followers = action.payload.data;
      })
      .addCase(getMyFollowers.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default githubSlice.reducer