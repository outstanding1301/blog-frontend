import axios from 'axios';
import { api } from '@src/consts';

const client = axios.create();

client.defaults.baseURL = api;
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
client.defaults.withCredentials = true;

client.interceptors.request.use(request => {
    console.log('Client Requset', request)
    return request
  })

client.interceptors.response.use(
    response => {
        console.log('Server Response', response)
        return response;
    },
    error => {
        console.log('Server Error', error)
        return Promise.reject(error);
    }
);
export default client;