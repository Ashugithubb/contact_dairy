

import { loginSchema } from '@/app/(auth)/login/page';
import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';



export const toggleContactStatus = createAsyncThunk(
    'contact/delete',
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:3001/contact/${id}`,

                { withCredentials: true }
            );
            return {id,...response.data};
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.message || 'Something went wrong';
            return thunkAPI.rejectWithValue(errorMessage);
        }
    }
);


