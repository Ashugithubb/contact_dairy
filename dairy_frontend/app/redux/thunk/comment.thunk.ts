import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const AddComment = createAsyncThunk(
  'auth/signup',
  async (data: {}, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/comment',
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Something went wrong';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

