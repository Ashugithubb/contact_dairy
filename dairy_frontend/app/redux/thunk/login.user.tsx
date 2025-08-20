// import { loginSchema } from '@/app/(auth)/login/page';
// import { signupSchema } from '@/app/(auth)/signup/schema/user.schema';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import z from 'zod';

// type loginFormData = z.infer<typeof loginSchema>;

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (data: loginFormData, thunkAPI) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:3001/auth/login',
//         data,
//         { withCredentials: true }
//       );
//       console.log(data);
//       return response.data;
//     } catch (error: any) {
//       const errorMessage =
//         error.response?.data?.message || 'Something went wrong';
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );


