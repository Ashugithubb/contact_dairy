import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadImage = createAsyncThunk(
  'user/uploadImage',
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post('http://localhost:3001/contact/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("abc",res.data)
      return res.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue('Upload failed');
    }
  }
);