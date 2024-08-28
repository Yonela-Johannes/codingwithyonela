import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
    feedback: [],
    loading: false,
    success: false,
    failed: false,
    deleted: false,
    updated: false,
    created: false,
}

export const getAllFeedback = createAsyncThunk('feedback/fetch all', async () =>
{
    const response = await axios.get(`${apiUrl}feedback`);
    return response.data;
});


export const updateFeedback = createAsyncThunk('feedback/update', async (data) =>
{
    const response = await axios.put(`${apiUrl}feedback/${data?.feedback_id}`, data);
    return response.data;
});

export const deleteFeedback = createAsyncThunk('feedback/delete', async (data) =>
{
    const response = await axios.delete(`${apiUrl}feedback/${data?.account_id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    });
    return response.data;
});

export const createFeedback = createAsyncThunk('feedback/create', async (data) =>
{
    const response = await axios.post(`${apiUrl}feedback`, data, {
        headers: formHeaders
    });
    return response.data;
});

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        disableFeedbackUpdates(state)
        {
            state.created = false
            state.success = false
            state.updated = false
            state.deleted = false
            state.loading = false
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(getAllFeedback.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(getAllFeedback.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.feedback = action.payload;
            })
            .addCase(getAllFeedback.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.message;
            })
            .addCase(updateFeedback.pending, (state) =>
            {
                state.loading = true
                state.updated = false
            })
            .addCase(updateFeedback.fulfilled, (state) =>
            {
                state.loading = false
                state.updated = true
                state.failed = false
            })
            .addCase(updateFeedback.rejected, (state, action) =>
            {
                state.loading = false
                state.error = action.message;
                state.failed = true
                state.updated = false
            })
            .addCase(deleteFeedback.pending, (state) =>
            {
                state.loading = true;
                state.success = false
                state.deleted = false
            })
            .addCase(deleteFeedback.fulfilled, (state) =>
            {
                state.loading = false;
                state.deleted = true
                state.failed = false
            })
            .addCase(deleteFeedback.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.message;
                state.deleted = false
                state.failed = true
                state.success = false
            })
            .addCase(createFeedback.pending, (state) =>
            {
                state.created = false
                state.loading = true;
                state.success = false
            })
            .addCase(createFeedback.fulfilled, (state) =>
            {
                state.created = true
                state.loading = false;
                state.success = true
                state.failed = false
            })
            .addCase(createFeedback.rejected, (state, action) =>
            {
                state.created = false
                state.loading = false;
                state.error = action.message;
                state.failed = true
                state.success = false
            })
    },
})

export const { disableFeedbackUpdates } = feedbackSlice.actions
export default feedbackSlice.reducer