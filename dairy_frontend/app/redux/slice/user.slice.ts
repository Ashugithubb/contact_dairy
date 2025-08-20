import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export const UserInfo = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:3001/user', {
        withCredentials: true,
      });
     
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user profile');
    }
  }
);




const initialState: UserState = {
  loading: false,
  error: null,
  profile: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UserInfo.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(UserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;


