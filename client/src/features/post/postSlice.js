import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
  posts: [],
  comments: [],
  post: {},
  loading: false,
  created: false,
  commented: false,
  updated: false,
  deleted: false,
  voted: false,
  responses: [],
  responded: false
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

export const createPost = createAsyncThunk('post/create post', async (data) =>
{
  const response = await axios.post(`${apiUrl}posts`, data, {
    headers: formHeaders
  });
  return response.data;
});

export const createPostComment = createAsyncThunk('post comment/create post', async (data) =>
{
  const response = await axios.post(`${apiUrl}posts-comment`, data,
    {
      headers: headers
    }
  );
  return response.data;
});

export const fetchPostComment = createAsyncThunk('post comment/fetch post', async (id) =>
{
  const response = await axios.get(`${apiUrl}posts-comment/${id}`,);
  return response.data;
});

export const createPostResponse = createAsyncThunk('post response/create response', async (data) =>
{
  const response = await axios.post(`${apiUrl}posts-response`, data,
    {
      headers: headers
    }
  );
  return response.data;
});

export const getPostResponses = createAsyncThunk('post response/fetch responses', async (id) =>
{
  const response = await axios.get(`${apiUrl}posts-response/${id}`,);
  return response.data;
});

export const deletePost = createAsyncThunk('post/delete', async (data) =>
{
  const response = await axios.delete(`${apiUrl}post/${data?.post}`, {
    headers: headers,
    data: JSON.stringify(data)
  });
  return response.data;
});

export const updatePost = createAsyncThunk('post/update', async (data) =>
{
  const response = await axios.put(`${apiUrl}post/${data?.post}`, data);
  return response.data;
});

export const vote = createAsyncThunk('post/vote', async (data) =>
{
  const response = await axios.post(`${apiUrl}posts-vote/${data?.post}`, data,
    {
      headers: headers
    }
  );
  return response.data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    disableUpdates(state)
    {
      state.created = false
      state.commented = false
      state.updated = false
      state.deleted = false
      state.voted = false
      state.responded = false
    }
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
      .addCase(createPost.pending, (state) =>
      {
        state.loading = true;
        state.created = false;
      })
      .addCase(createPost.fulfilled, (state, action) =>
      {
        state.posts = action.payload.data;
        state.loading = false;
        state.created = true;
      })
      .addCase(createPost.rejected, (state, action) =>
      {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
      .addCase(createPostComment.pending, (state) =>
      {
        state.loading = true;
        state.commented = false;
      })
      .addCase(createPostComment.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.commented = true;
      })
      .addCase(createPostComment.rejected, (state, action) =>
      {
        state.loading = false;
        state.commented = false;
        state.error = action.message;
      })
      .addCase(createPostResponse.pending, (state) =>
      {
        state.loading = true;
        state.responded = false;
      })
      .addCase(createPostResponse.fulfilled, (state, action) =>
      {
        state.loading = false;
        state.responded = true;
      })
      .addCase(createPostResponse.rejected, (state, action) =>
      {
        state.loading = false;
        state.responded = false;
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
        state.error = action.message;
      })
      .addCase(getPostResponses.pending, (state) =>
      {
        state.loading = true;
      })
      .addCase(getPostResponses.fulfilled, (state, action) =>
      {
        state.responses = action.payload.data;
        state.loading = false;
      })
      .addCase(getPostResponses.rejected, (state, action) =>
      {
        state.error = action.message;
      })
      .addCase(updatePost.rejected, (state, action) =>
      {
        state.updated = false;
        state.error = action.message;
      })
      .addCase(updatePost.pending, (state) =>
      {
        state.updated = false;
      })
      .addCase(updatePost.fulfilled, (state) =>
      {
        state.updated = true;
      })
      .addCase(vote.rejected, (state, action) =>
      {
        state.voted = false;
        state.error = action.message;
      })
      .addCase(vote.pending, (state) =>
      {
        state.voted = false;
      })
      .addCase(vote.fulfilled, (state) =>
      {
        state.voted = true;
      })
      .addCase(deletePost.rejected, (state, action) =>
      {
        state.deleted = false;
        state.loading = false;
        state.error = action.message;
      })
      .addCase(deletePost.pending, (state) =>
      {
        state.deleted = false;
      })
      .addCase(deletePost.fulfilled, (state, action) =>
      {
        state.deleted = true;
      })
  },
})

export const { disableUpdates } = postSlice.actions
export default postSlice.reducer