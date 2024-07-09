import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  user: {},
  loading: false,
  users: []
}

export const signIn = createAsyncThunk('user/signin', async (userId) =>
{
  userId = 2
  const response = await axios.get(`${apiUrl}user?id=${userId}`);
  console.log(response?.data);
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async (userId) =>
{
  userId = 2
  const response = await axios.get(`${apiUrl}user/${userId}`);
  return response.data;
});

export const getUsers = createAsyncThunk('user/getUsers', async (userId) =>
{
  const response = await axios.get(`${apiUrl}user`);
  return response.data;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(signIn.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getUsers.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.users = action.payload.data;
      })
      .addCase(getUsers.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default userSlice.reducer