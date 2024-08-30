import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
    events: [],
    event: {},
    loading: false,
    success: false,
    failed: false,
    deleted: false,
    updated: false,
}

export const getAllEvents = createAsyncThunk('events/fetch all', async () =>
{
    const response = await axios.get(`${apiUrl}event`);
    return response.data;
});

export const getEvent = createAsyncThunk('events/fetch One', async (id) =>
{
    const response = await axios.get(`${apiUrl}event/${id}`);
    return response.data;
});

export const createEvent = createAsyncThunk('events/create', async (data) =>
{
    await axios.post(`${apiUrl}event`, data,
        {
            headers: formHeaders
        }
    )
        .then((response) => response.data)
        .catch(({ response }) =>
        {
            if (response.status == 401)
            {
                localStorage.removeItem("persist:user")
                window.location.reload()
            }
        })
});

export const deleteEvent = createAsyncThunk('events/delete', async (data) =>
{
    const response = await axios.delete(`${apiUrl}event/${data?.account_id}`, {
        headers: headers,
        data: JSON.stringify(data)
    });
    return response.data;
});


export const updateEvent = createAsyncThunk('event/edit', async (data) =>
{
    const response = await axios.put(`${apiUrl}event/${data?.project_id}`, { ...data });
    return response.data;
});

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        disableEventUpdate(state)
        {
            state.loading = false
            state.success = false
            state.failed = false
            state.deleted = false
            state.updated = false
        },
        setSelectProject: (state, action) =>
        {
            state.event = action.payload
        },
        getSelectProject: (state) =>
        {
            state.event
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(getAllEvents.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(getAllEvents.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getAllEvents.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.message;
            })
            .addCase(createEvent.pending, (state) =>
            {
                state.success = false
            })
            .addCase(createEvent.fulfilled, (state) =>
            {
                state.success = true
            })
            .addCase(createEvent.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.message;
                state.failed = true
                state.success = false
            })
            .addCase(deleteEvent.pending, (state) =>
            {
                state.deleted = false
            })
            .addCase(deleteEvent.fulfilled, (state) =>
            {
                state.deleted = true
            })
            .addCase(deleteEvent.rejected, (state, action) =>
            {
                state.error = action.message;
                state.deleted = false
            })
            .addCase(getEvent.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(getEvent.fulfilled, (state, action) =>
            {
                state.event = action.payload.data;
            })
            .addCase(getEvent.rejected, (state, action) =>
            {
                state.error = action.message;
            })
            .addCase(updateEvent.pending, (state) =>
            {
                state.success = false
                state.updated = false
            })
            .addCase(updateEvent.fulfilled, (state) =>
            {
                state.success = true
                state.updated = true
            })
            .addCase(updateEvent.rejected, (state, action) =>
            {
                state.error = action.message;
                state.success = false
                state.updated = false
            })
    },
})

export const { setSelectProject, getSelectProject, disableEventUpdate } = eventSlice.actions
export default eventSlice.reducer