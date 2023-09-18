import { createAsyncThunk } from '@reduxjs/toolkit';
import { superpowersService } from '../../services/superpowers.service';

export const allSuperpowersThunk = createAsyncThunk('superpowers/find-all', async () => {
  const { data: superpowers } = await superpowersService.findAll();
  return superpowers;
});
