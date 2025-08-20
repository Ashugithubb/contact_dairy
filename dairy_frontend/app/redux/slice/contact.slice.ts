import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import qs from 'qs'

export interface phone{
   phoneNumberId: number,
   phoneNumber: string
}
export interface ContactTag {
  id: number;
  tag: {id: number,
        tagName: string}
}

export interface Contact {
  id: number,
  firstName: string,
  lastName: string,
  nickName: string,
  email: string,
  favorite: boolean,
  avtarUrl:string
  deletedAt: string | null;
  contactTag: ContactTag[];
  phoneNumbers:phone[]
}

export interface ContactResponse {
  total: number;
  page: number;
  limit: number;
  contacts: Contact[];
}

interface FeedbackState {
  contactlist: ContactResponse  | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  contactlist: null,
  loading: false,
  error: null,
};


export interface GetContactQuery {
  page?: number;
  limit?: number;
  searchValue?: string
  tags?: number[]
  deleted?: boolean
}

export const getContactThunk = createAsyncThunk(
  'contact/getcontact',
  async (query: GetContactQuery, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3001/contact`, {
        withCredentials: true,
        params: query,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });
      console.log("contacts",response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch contacts');
    }
  }
);



const contactSlice = createSlice({
  name: 'contactlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactThunk.fulfilled, (state, action) => {
        state.loading = false;
        console.log("inside payload", action.payload);
        state.contactlist = action.payload;
        console.log('state.contactlist: ', state.contactlist);
      })
      .addCase(getContactThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
;

export default contactSlice.reducer;