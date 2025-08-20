

import { loginSchema } from '@/app/(auth)/login/page';
import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
import { CreateContactFormData } from '@/app/schema/contact.schema';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import z from 'zod';



export const editContact = createAsyncThunk(
    'contact/edit',
    async ({data,id}: {data:CreateContactFormData,id:number}, thunkAPI) => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/contact/${id}`,
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


