import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders } from '../../constants/base_urls';

const initialState = {
  blogs: [],
  comments: [],
  enums: [],
  blog: {},
  loading: false,
  created: false,
  commented: false,
  updated: false,
  deleted: false,
}

export const getAllBlogs = createAsyncThunk('blogs/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}blogs`);
  return response.data;
});

export const getBlog = createAsyncThunk('blog/fetch blog', async (slug) =>
{
  const response = await axios.get(`${apiUrl}blog`, {
    params: { slug: slug }
  });
  return response.data;
});

export const createBlog = createAsyncThunk('blog/create blog', async (data) =>
{
  const response = await axios.post(`${apiUrl}blogs`, data, {
    headers: formHeaders
  });
  return response.data;
});

export const createBlogComment = createAsyncThunk('blog comment/create blog', async (data) =>
{
  const response = await axios.post(`${apiUrl}blog-comment`, data);
  return response.data;
});

export const fetchBlogComment = createAsyncThunk('blog comment/fetch blog', async (id) =>
{
  const response = await axios.get(`${apiUrl}blogs-comment`, {
    params: { id: id }
  });
  return response.data;
});

export const fetchBlogEnums = createAsyncThunk('blog enums/fetch blog enums', async (id) =>
{
  const response = await axios.get(`${apiUrl}blog-enums`,);
  return response.data;
});


export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    disableBlogUpdates(state)
    {
      state.created = false
      state.commented = false
      state.updated = false
      state.deleted = false
    }
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllBlogs.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.blogs = action.payload.data;
      })
      .addCase(getAllBlogs.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getBlog.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(getBlog.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createBlogComment.pending, (state) =>
      {
        state.loading = true;
        state.created = false;
      })
      .addCase(createBlogComment.fulfilled, (state) =>
      {
        state.loading = false;
        state.created = true;
      })
      .addCase(createBlogComment.rejected, (state, action) =>
      {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
      .addCase(fetchBlogComment.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(fetchBlogComment.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchBlogComment.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(fetchBlogEnums.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(fetchBlogEnums.fulfilled, (state, action) =>
      {
        state.enums = action.payload.data['enum_range'];
        state.loading = false;
      })
      .addCase(fetchBlogEnums.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createBlog.pending, (state) =>
      {
        state.loading = true;
        state.created = false;
      })
      .addCase(createBlog.fulfilled, (state, action) =>
      {
        state.posts = action.payload.data;
        state.loading = false;
        state.created = true;
      })
      .addCase(createBlog.rejected, (state, action) =>
      {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
  },
})

export const { disableBlogUpdates } = blogSlice.actions
export default blogSlice.reducer