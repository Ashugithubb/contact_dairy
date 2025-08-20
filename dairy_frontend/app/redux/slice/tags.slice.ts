import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { boolean } from 'zod';

export interface TagDetails {
    id: number,
    tagName: string
}
export interface Tags {
    loading: boolean;
    error: string | null;
    tagDetails: TagDetails[] | null
}

const initialState: Tags = {
    loading: false,
    error: null,
    tagDetails: null
}

export const TagInfo = createAsyncThunk(
    'tag/getTag',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:3001/tag', {
                withCredentials: true,
            });
            
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch tags');
        }
    }
);






const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.tagDetails = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(TagInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(TagInfo.fulfilled, (state, action: PayloadAction<TagDetails[]>) => {
                state.loading = false;
                state.tagDetails = action.payload;
            })
            .addCase(TagInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = tagSlice.actions;

export default tagSlice.reducer;


