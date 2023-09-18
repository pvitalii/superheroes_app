import { EntityState, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Superhero } from '../../../common/types/superhero/superhero.type';
import {
  allSuperheroesThunk,
  createSuperheroThunk,
  deleteSuperheroThunk,
  editSuperheroThunk
} from './superheroes.thunks';
import { AppStateType } from '../..';

type SuperheroesState = EntityState<Superhero> & {
  isLoading: boolean;
  error: null | string;
  count: number;
};

const superheroesAdapter = createEntityAdapter<Superhero>();

const initialState: SuperheroesState = superheroesAdapter.getInitialState({
  isLoading: false,
  error: null,
  count: 0
});

const superheroesSlice = createSlice({
  name: 'superheroes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(allSuperheroesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(allSuperheroesThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      const [superheroes, count] = payload;
      superheroesAdapter.setAll(state, superheroes);
      state.count = count;
    });
    builder.addCase(allSuperheroesThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to fetch superheroes';
      superheroesAdapter.setAll(state, []);
    });

    builder.addCase(createSuperheroThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createSuperheroThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      superheroesAdapter.addOne(state, payload);
    });
    builder.addCase(createSuperheroThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to create superhero';
      state.count += 1;
    });

    builder.addCase(editSuperheroThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editSuperheroThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      superheroesAdapter.setOne(state, payload);
    });
    builder.addCase(editSuperheroThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to edit superhero';
    });

    builder.addCase(deleteSuperheroThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSuperheroThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      superheroesAdapter.removeOne(state, payload);
      state.count -= 1;
    });
    builder.addCase(deleteSuperheroThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'Failed to delete superhero';
    });
  }
});

export const superheroesSelectors = superheroesAdapter.getSelectors<AppStateType>(
  (state) => state.superheroes
);

export const superheroesReducer = superheroesSlice.reducer;
