
import { loginSchema } from '@/app/(auth)/login/page';
import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';

type loginFormData = z.infer<typeof loginSchema>;

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: loginFormData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/auth/login',
        data,
        { withCredentials: true }
      );
      console.log(data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export interface authinfo{
  msg:string,
  token:string,
}
export interface login{
    loading: boolean;
    error: string | null;
    auth:authinfo|null
}
const initialState :login = {
    loading: false,
    error: null,
   auth:null
}

const loginSlice = createSlice({
    name: 'authlogin',
    initialState,
    reducers: {
        clearUser: (state) => {
            state.auth = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser .pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser .fulfilled, (state, action: PayloadAction<authinfo>) => {
                state.loading = false;
                console.log("action ",action.payload)
                state.auth = action.payload

            })
            .addCase(loginUser .rejected, (state, action) => {
                state.loading = false;
                state.error = null;
            });
    },
});

export const { clearUser } = loginSlice.actions;

export default loginSlice.reducer;
