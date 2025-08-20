'use client'
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { any } from 'zod';



export interface Feedback {
  id: number;
  title: string;
  description: string;
  status: string;
  upVotes: number;
  downVotes: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}


interface FeedbackState {
  feedbacklist: Feedback[] ;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacklist: [],
  loading: false,
  error: null,
};

export const getMyFeedbackThunk = createAsyncThunk(
  'myfeedback/getmyFeedback',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/feedback`, {
        withCredentials: true,
      });
      console.log("res",response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch students');
    }
  }
);
const myFeedbackSlice = createSlice({
  name: 'myfeedbacklist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyFeedbackThunk .pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyFeedbackThunk .fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacklist = action.payload;
      })
      .addCase(getMyFeedbackThunk .rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
;

export default myFeedbackSlice.reducer;