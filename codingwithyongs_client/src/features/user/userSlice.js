import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  user: {},
  loading: false
}

export const signIn = createAsyncThunk('user/signin', async (userId) => {
    userId = 2
    const response = await axios.get(`${apiUrl}user?id=${userId}`);
    console.log(response?.data);
    return response.data;
  });
  
  export const getUser = createAsyncThunk('user/getUser', async (userId) => {
    userId = 2
    const response = await axios.get(`${apiUrl}user/${userId}`);
    return response.data;
  });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      });
  },
})

export default userSlice.reducer