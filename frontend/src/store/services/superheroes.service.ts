import axios from 'axios';
import { Superhero } from '../../common/types/superhero/superhero.type';
import { CreateSuperheroPayload } from '../../common/types/superhero/create-superhero.type';
import { EditSuperheroPayload } from '../../common/types/superhero/edit-superhero.type';

class SuperheroesService {
  private endpointName = 'superheroes';

  findAll(page: number | string) {
    return axios.get<[Superhero[], number]>(
      `${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}`,
      {
        params: { page }
      }
    );
  }

  findOne(id: number) {
    return axios.get<Superhero>(
      `${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}/${id}`
    );
  }

  createSuperhero(payload: CreateSuperheroPayload) {
    return axios.post<Superhero>(
      `${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}`,
      payload
    );
  }

  editSuperhero(id: number, payload: EditSuperheroPayload) {
    return axios.patch<Superhero>(
      `${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}/${id}`,
      payload
    );
  }

  deleteSuperhero(id: number) {
    return axios.delete<void>(`${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}/${id}`);
  }
}

export const superheroesService = new SuperheroesService();
