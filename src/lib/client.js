import axios from 'axios';
import { api } from '../consts';

const client = axios.create();

client.defaults.baseURL = api;
client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';
client.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default client;