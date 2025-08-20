import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


export interface UserDetails {
    id: number,
    userName: string
}
export interface users {
    loading: boolean;
    error: string | null;
    userDetails: UserDetails[] | null
}

const initialState: users = {
    loading: false,
    error: null,
    userDetails: null
}

export const UserSearch = createAsyncThunk(
    'userSearch/getuserSerach',
    async (_, thunkAPI) => {
        try {
            const res = await axios.get('http://localhost:3001/user/search', {
                withCredentials: true,
            });
            console.log(" user data:", res.data);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch tags');
        }
    }
);






const userSearchSlice = createSlice({
    name: 'usersearch',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.userDetails = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(UserSearch .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(UserSearch .fulfilled, (state, action: PayloadAction<UserDetails[]>) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(UserSearch .rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearUser } = userSearchSlice.actions;

export default userSearchSlice.reducer;


