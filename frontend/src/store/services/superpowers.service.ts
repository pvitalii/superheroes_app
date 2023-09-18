import axios from 'axios';
import { Superpower } from '../../common/types/superpower.type';

class SuperpowersService {
  private endpointName = 'superpowers';

  findAll() {
    return axios.get<Superpower[]>(`${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}`);
  }
}

export const superpowersService = new SuperpowersService();
