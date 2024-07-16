import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, headers } from '../../constants/base_urls';

const initialState = {
  token: "",
  currentUser: {},
  user: {},
  loading: false,
  users: []
}

export const login = createAsyncThunk('user/login', async (data) =>
{
  console.log(data)
  const response = await axios.get(`${apiUrl}login`,
    {
      headers: headers,
      params: data
    });
  console.log(response?.data);
  return response.data;
});

export const signIn = createAsyncThunk('user/signin', async (userId) =>
{
  const response = await axios.get(`${apiUrl}user?id=${userId}`);
  console.log(response?.data);
  return response.data;
});

export const getUser = createAsyncThunk('user/getUser', async (userId) =>
{
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
      .addCase(login.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.token = action.payload.data.token
        state.currentUser = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default userSlice.reducer