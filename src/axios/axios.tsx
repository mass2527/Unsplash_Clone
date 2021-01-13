import axios from 'axios';
import { clientId } from '../config/secret';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/photos/',
  params: {
    client_id: clientId,
  },
});

export const unsplashApi = {
  getLatestPhotos: () => instance.get(''),
  getPhotoById: (id: string) => instance.get(`${id}`),
};

export const getLatestPhotosByPage = (page: number) => {
  return axios.get('https://api.unsplash.com/photos/', {
    params: {
      client_id: clientId,
      page,
    },
  });
};
