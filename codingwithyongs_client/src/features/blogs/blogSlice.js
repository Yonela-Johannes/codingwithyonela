import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  blogs: [],
  blog: {},
  loading: false
}
  
  export const getAllBlogs = createAsyncThunk('blogs/fetch all', async () => {
    const response = await axios.get(`${apiUrl}blogs`);
    return response.data;
  });

  export const getBlog = createAsyncThunk('blog/fetch blog', async (userId) => {
    const response = await axios.get(`${apiUrl}blog?id=${userId}`);
    console.log(response)
    return response.data;
  });

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default blogSlice.reducer