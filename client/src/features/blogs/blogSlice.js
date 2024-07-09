import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  blogs: [],
  comments: [],
  blog: {},
  loading: false,
  created: false
}
  
  export const getAllBlogs = createAsyncThunk('blogs/fetch all', async () => {
    const response = await axios.get(`${apiUrl}blogs`);
    return response.data;
  });

  export const getBlog = createAsyncThunk('blog/fetch blog', async (userId) => {
    const response = await axios.get(`${apiUrl}blog?id=${userId}`);
    return response.data;
  });

  export const createBlogComment = createAsyncThunk('blog comment/create blog', async (data) => {
    const response = await axios.post(`${apiUrl}blog-comment`, data);
    return response.data;
  });

  export const fetchBlogComment = createAsyncThunk('blog comment/fetch blog', async (id) => {
    const response = await axios.get(`${apiUrl}blogs-comment/${id}`, );
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
      .addCase(createBlogComment.pending, (state) => {
        state.loading = true;
        state.created = false;
      })
      .addCase(createBlogComment.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
        state.created = true;
      })
      .addCase(createBlogComment.rejected, (state, action) => {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
      .addCase(fetchBlogComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogComment.fulfilled, (state, action) => {
        state.comments = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchBlogComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default blogSlice.reducer