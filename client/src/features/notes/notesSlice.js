import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, formHeaders, headers } from "../../constants/base_urls";

const initialState = {
  notes: [],
  note: {},
  loading: false,
  created: false,
  updated: false,
  deleted: false,
  pinned: true,
};

export const getAllNotes = createAsyncThunk("notes/fetch all", async () => {
  const response = await axios.get(`${apiUrl}notes`);
  return response.data;
});

export const getNote = createAsyncThunk("note/fetch note", async (slug) => {
  const response = await axios.get(`${apiUrl}note/${slug}`, {
    params: { slug: slug },
  });
  return response.data;
});

export const createNote = createAsyncThunk("note/create note", async (data) => {
  await axios
    .post(`${apiUrl}notes`, data, {
      headers: formHeaders,
    })
    .then((response) => response.data)
    .catch(({ response }) => {
      if (response.status == 401) {
      }
    });
});

export const removeNote = createAsyncThunk("note/delete", async (id) => {
  const response = await axios.delete(`${apiUrl}note`, {
    headers: formHeaders,
    data: { id },
  });
  return response.data;
});

export const updateNote = createAsyncThunk("note/edit", async (data) => {
  const response = await axios.put(`${apiUrl}note`, data, {
    headers: formHeaders,
  });
  return response.data;
});

export const pinNote = createAsyncThunk("note/pin", async (data) => {
  const response = await axios.put(`${apiUrl}note`, data, {
    headers: formHeaders,
  });
  return response.data;
});

export const notesSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    disableNotesUpdates(state) {
      state.created = false;
      state.commented = false;
      state.updated = false;
      state.deleted = false;
      state.pinned = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(getNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.loading = false;
        state.note = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.message;
      })
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.created = false;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.created = true;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.created = false;
        state.error = action.message;
      })
      .addCase(removeNote.pending, (state) => {
        state.deleted = false;
      })
      .addCase(removeNote.fulfilled, (state) => {
        state.deleted = true;
      })
      .addCase(removeNote.rejected, (state, action) => {
        state.error = action.message;
        state.deleted = false;
      })
      .addCase(updateNote.pending, (state) => {
        state.success = false;
        state.updated = false;
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.success = true;
        state.updated = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.error = action.message;
        state.success = false;
        state.updated = false;
      })
      .addCase(pinNote.pending, (state) => {
        state.success = false;
        state.pinned = false;
      })
      .addCase(pinNote.fulfilled, (state) => {
        state.success = true;
        state.pinned = true;
      })
      .addCase(pinNote.rejected, (state, action) => {
        state.error = action.message;
        state.success = false;
        state.pinned = false;
      });
  },
});

export const { disableNotesUpdates } = notesSlice.actions;
export default notesSlice.reducer;
