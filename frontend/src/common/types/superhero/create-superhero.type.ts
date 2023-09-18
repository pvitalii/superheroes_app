import { Superhero } from './superhero.type';

export type CreateSuperheroPayload = Omit<Superhero, 'id'>;
