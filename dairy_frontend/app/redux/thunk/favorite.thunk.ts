import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const toggleFavorite = createAsyncThunk(
  'like/unlike',
  async (id: number, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/contact/${id}`,

                { withCredentials: true }
            );
            console.log("responses",response.data)
            return response.data;
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);

