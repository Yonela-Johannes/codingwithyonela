import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl } from '../../constants/base_urls';

const initialState = {
  posts: [],
  comments: [],
  post: {},
  loading: false,
  created: false
}

export const getAllPosts = createAsyncThunk('posts/fetch all', async () =>
{
  const response = await axios.get(`${apiUrl}posts`);
  return response.data;
});

export const getPost = createAsyncThunk('post/fetch post', async (slug) =>
{
  const response = await axios.get(`${apiUrl}posts?slug=${slug}`);
  return response.data;
});

export const createPostComment = createAsyncThunk('post comment/create post', async (data) =>
{
  const response = await axios.post(`${apiUrl}posts-comment`, data);
  return response.data;
});

export const fetchPostComment = createAsyncThunk('post comment/fetch post', async (id) =>
{
  console.log("ID: ", id)
  const response = await axios.get(`${apiUrl}posts-comment/${id}`,);
  return response.data;
});


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
  },
  extraReducers: (builder) =>
  {
    builder
      .addCase(getAllPosts.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getPost.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(getPost.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createPostComment.pending, (state) =>
      {
        state.loading = true;
        state.created = false;
      })
      .addCase(createPostComment.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.loading = false;
        state.created = true;
      })
      .addCase(createPostComment.rejected, (state, action) =>
      {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
      .addCase(fetchPostComment.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(fetchPostComment.fulfilled, (state, action) =>
      {
        state.comments = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchPostComment.rejected, (state, action) =>
      {
        state.loading = false;
        state.error = action.message;
      })
  },
})

export default postSlice.reducer