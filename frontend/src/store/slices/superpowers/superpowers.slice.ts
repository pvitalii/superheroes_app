import { createSlice } from '@reduxjs/toolkit';
import { allSuperpowersThunk } from './superpowers.thunks';
import { Superpower } from '../../../common/types/superpower.type';

type SuperpowersState = {
  error: null | string;
  isLoading: boolean;
  data: Superpower[];
};

const initialState: SuperpowersState = {
  error: null,
  isLoading: false,
  data: [] as Superpower[]
};

const superpowersSlice = createSlice({
  name: 'superpowers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allSuperpowersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allSuperpowersThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.data = payload;
    });
    builder.addCase(allSuperpowersThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to fetch superpowers';
      state.data = [];
    });
  }
});

export const superpowersReducer = superpowersSlice.reducer;
