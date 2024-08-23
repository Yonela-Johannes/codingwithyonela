import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  user: {},
  loading: false,
  users: [],
  message: "",
}


export const getUser = createAsyncThunk('user/getUser', async (userId) =>
{
  const response = await axios.get(`${apiUrl}user/${userId}`);
  return response.data;
});

export const getUsers = createAsyncThunk('user/getUsers', async () =>
{
  const response = await axios.get(`${apiUrl}users`);
  return response.data;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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
  },
})

export default userSlice.reducer