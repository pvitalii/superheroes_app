import { createAsyncThunk } from '@reduxjs/toolkit';
import { superheroesService } from '../../services/superheroes.service';
import { CreateSuperheroPayload } from '../../../common/types/superhero/create-superhero.type';
import { EditSuperheroPayload } from '../../../common/types/superhero/edit-superhero.type';

export const allSuperheroesThunk = createAsyncThunk(
  'superheroes/find-all',
  async (page: number | string) => {
    const { data: superheroes } = await superheroesService.findAll(page);
    return superheroes;
  }
);

export const oneSuperheroThunk = createAsyncThunk('superheroes/find-one', async (id: number) => {
  const { data: superhero } = await superheroesService.findOne(id);
  return superhero;
});

export const createSuperheroThunk = createAsyncThunk(
  'superheroes/create',
  async (payload: CreateSuperheroPayload) => {
    const { data: superhero } = await superheroesService.createSuperhero(payload);
    return superhero;
  }
);

export const editSuperheroThunk = createAsyncThunk(
  'superheroes/edit',
  async (args: { id: number; payload: EditSuperheroPayload }) => {
    const { data: superhero } = await superheroesService.editSuperhero(args.id, args.payload);
    return superhero;
  }
);

export const deleteSuperheroThunk = createAsyncThunk('superheroes/delete', async (id: number) => {
  await superheroesService.deleteSuperhero(id);
  return id;
});
