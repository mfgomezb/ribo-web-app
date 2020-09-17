import axios from 'axios';
import { axiosConfig } from '../config';

const axiosInstance = axios.create({
  baseURL: axiosConfig.baseURL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.log(error);
    return Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    );
  }
);

export default axiosInstance;
