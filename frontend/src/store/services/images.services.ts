import axios from 'axios';
import { Image } from '../../common/types/image.type';

class ImagesService {
  private endpointName = 'images';

  saveImages(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return axios.post<Image[]>(
      `${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}/upload`,
      formData
    );
  }

  deleteImages(images: Image[]) {
    return axios.post(`${process.env.REACT_APP_BACKEND_ORIGIN}/${this.endpointName}/delete`, {
      images
    });
  }
}

export const imagesService = new ImagesService();
