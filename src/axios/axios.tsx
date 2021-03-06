// import axios from 'axios';
// import { clientId } from '../config/secret';

// const instance = axios.create({
//   baseURL: 'https://api.unsplash.com/photos/',
//   params: {
//     client_id: clientId,
//   },
// });

// export const unsplashApi = {
//   getLatestPhotos: () => instance.get(''),
//   getPhotoById: (id: string) => instance.get(`${id}`),
//   getRelatedPhotosById: (id: string) => instance.get(`${id}/related`),
// };

// export const getLatestPhotosByPage = (page: number) => {
//   return axios.get('https://api.unsplash.com/photos/', {
//     params: {
//       client_id: clientId,
//       page,
//     },
//   });
// };

// export const getUserPhotos = (userName: string | undefined) => {
//   return axios.get(`https://api.unsplash.com/users/${userName}/photos`, {
//     params: {
//       client_id: clientId,
//       per_page: 3,
//     },
//   });
// };

// export const downloadImageFromURL = async (downloadURL: string, imageName: string, userName: string) => {
//   return axios
//     .get(downloadURL, {
//       responseType: 'blob',
//       params: {
//         client_id: clientId,
//       },
//     })
//     .then((res) => {
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('target', `_blank`);
//       link.setAttribute('download', `${userName} - ${imageName}-unsplash.jpg`);
//       document.body.appendChild(link);
//       link.click();
//     });
// };

// export const trackPhotoDownload = (id: string) => {
//   return axios.get(`https://api.unsplash.com/photos/${id}/download`, {
//     params: {
//       client_id: clientId,
//     },
//   });
// };

// export const getPhotoBySearchTerm = (searchTerm: string, page: number) => {
//   return axios.get('https://api.unsplash.com/search/photos', {
//     params: {
//       client_id: clientId,
//       query: searchTerm,
//       page,
//     },
//   });
// };

import axios from 'axios';
import { clientId } from '../config/secret';

const instance = axios.create({
  baseURL: 'https://api.unsplash.com/',
  params: {
    client_id: clientId,
  },
});

export const unsplashApi = {
  getLatestPhotos: (page: number) => instance.get('photos'),
  getPhotoById: (id: string) => instance.get(`photos/${id}`),
  getRelatedPhotosById: (id: string) => instance.get(`photos/${id}/related`),
  getLatestPhotosByPage: (page: number) =>
    instance.get('photos', {
      params: {
        page,
      },
    }),
  getUserPhotos: (userName: string | undefined) =>
    instance.get(`users/${userName}/photos`, {
      params: {
        per_page: 3,
      },
    }),
  getPhotoBySearchTerm: (searchTerm: string, page: number) =>
    instance.get('https://api.unsplash.com/search/photos', {
      params: {
        query: searchTerm,
        page,
      },
    }),
  trackPhotoDownload: (id: string) => instance.get(`photos/${id}/download`),
};

export const downloadImageFromURL = async (downloadURL: string, imageName: string, userName: string) => {
  const res = await axios.get(downloadURL, {
    responseType: 'blob',
    params: {
      client_id: clientId,
    },
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', `_blank`);
  link.setAttribute('download', `${userName} - ${imageName}-unsplash.jpg`);
  document.body.appendChild(link);
  link.click();
};
