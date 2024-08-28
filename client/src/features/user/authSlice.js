import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { apiUrl, formHeaders, headers } from '../../constants/base_urls';

const initialState = {
    token: "",
    currentUser: {},
    loading: false,
    message: "",
    active_signup_modal: false,
    active_signin_modal: false,
    signup_success: false,
    signin_success: false,
    update_success: false
}

export const login = createAsyncThunk('user/login', async (data) =>
{
    const response = await axios.get(`${apiUrl}login`,
        {
            headers: formHeaders,
            params: data
        });
    return response.data;
});

export const register = createAsyncThunk('user/register', async (data) =>
{
    const response = await axios.post(`${apiUrl}user`, data,
        {
            headers: formHeaders,
        });
    return response.data;
});

export const verifyRegistration = createAsyncThunk('user/verify/email', async (token) =>
{
    const response = await axios.post(`${apiUrl}verify-email?token=${token}`,
        {
            headers: formHeaders,
        });
    return response.data;
});

export const updateUser = createAsyncThunk('user/edit', async (data) =>
{

    const response = await axios.put(`${apiUrl}user/${data?.id}`, data,
        {
            headers: formHeaders,
        });
    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state)
        {
            state.token = ""
            state.currentUser = {}
        },
        activeSignup(state)
        {
            state.signup_success = false
            state.active_signin_modal = false
            state.active_signup_modal = true
        },
        activeSignin(state)
        {
            state.signin_success = false
            state.active_signup_modal = false
            state.active_signin_modal = true
        },
        disableAuthModals(state)
        {
            state.signin_success = false
            state.signup_success = false
            state.loading = false
            state.active_signin_modal = false
            state.active_signup_modal = false
            state.message = ''
            state.update_success = false
        }
    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(login.pending, (state) =>
            {
                state.loading = true;
                state.signin_success = false
            })
            .addCase(login.fulfilled, (state, action) =>
            {
                console.log(action.payload)
                state.loading = false;
                state.token = action.payload.token
                state.currentUser = action.payload.user;
                state.signin_success = true
            })
            .addCase(login.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.message;
                state.signin_success = false
            })

            .addCase(register.pending, (state) =>
            {
                state.signup_success = false
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message
                state.signup_success = true
            })
            .addCase(register.rejected, (state, action) =>
            {
                state.loading = false;
                state.signup_success = false
                state.message = 'Something went wrong'
                state.error = action.message;
            })
            .addCase(verifyRegistration.pending, (state) =>
            {
                state.signin_success = false
                state.loading = true;
            })
            .addCase(verifyRegistration.fulfilled, (state, action) =>
            {
                state.signin_success = true
                state.loading = false;
                state.token = action.payload.token
                state.message = action.payload.message
                state.currentUser = action.payload;
            })
            .addCase(verifyRegistration.rejected, (state, action) =>
            {
                state.signin_success = false
                state.loading = false;
            })
            .addCase(updateUser.pending, (state) =>
            {
                state.update_success = false
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.token = action.payload.token
                state.message = action.payload.message
                state.update_success = true
            })
            .addCase(updateUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message
                state.error = action.message;
                state.update_success = false
            })
    },
})

export const { logout, activeSignup, activeSignin, disableAuthModals } = authSlice.actions
export default authSlice.reducer