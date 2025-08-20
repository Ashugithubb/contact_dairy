

import { loginSchema } from '@/app/(auth)/login/page';
import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { CreateContactFormData } from '@/app/schema/contact.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';



export const editContact = createAsyncThunk(
    'contact/edit',
    async (data: CreateContactFormData, thunkAPI) => {
        try {
            const response = await axios.post(
                'http://localhost:3001/contact',
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


