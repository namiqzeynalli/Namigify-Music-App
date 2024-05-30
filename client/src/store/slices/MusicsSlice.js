import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    musics: [],
    loading: false,
    error: false,
}

export const getMusics = createAsyncThunk("musics", async (trackParametersForDefault) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=505&type=track`,
        trackParametersForDefault
    )
        .then((response) => response.json())
        .then((data) => data.tracks.items);
    // console.log(response)
    return response
});

export const getSearchMusics = createAsyncThunk("searchMusics", async ({ trackParameters, searchInputValue }) => {
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInputValue}&type=track`,
        trackParameters
    )
        .then((response) => response.json())
        .then((data) => data.tracks.items);
    // console.log(response)
    return response
});

export const MusicsSlice = createSlice({
    name: 'musics',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMusics.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getMusics.fulfilled, (state, action) => {
            state.loading = false;
            state.musics = action.payload;
        })
        builder.addCase(getMusics.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
        builder.addCase(getSearchMusics.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getSearchMusics.fulfilled, (state, action) => {
            state.loading = false;
            state.musics = action.payload;
        })
        builder.addCase(getSearchMusics.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })
    }
})

export const { } = MusicsSlice.actions

export default MusicsSlice.reducer