import axios from 'axios';
import { baseUrl } from './constants';

const instance = axios.create({
  baseURL: baseUrl
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response && response.status === 401) {
        // Handle logout here
        console.log("unauthenticated and it's time to redirect");
        localStorage.removeItem('token');
        
      }
      
    return Promise.reject(error);
  }
);

export default instance;
