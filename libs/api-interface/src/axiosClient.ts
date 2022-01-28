import axios from 'axios';
import qs from 'qs';
// import { refreshToken } from './api/auth';
// import { APIResponse } from './types';
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${access_token}`,
    };
  }
  return config;
});
// const refreshTokenRequest: Promise<APIResponse.Login> | null = null;
axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data;
    return response;
  },
  (error) => {
    // Token hết hạn
    if (error?.response?.status === 401) {
      console.log('Token expired...');
      // const refresh_token = localStorage.getItem('refresh_token')
      // if (!!refresh_token) {
      // refreshTokenRequest = refreshTokenRequest || refreshToken();
      // return refreshTokenRequest
      //   .then((data) => {
      //     localStorage.setItem('access_token', data.access_token);
      //     refreshTokenRequest = null;
      //     return axiosClient.request(error.config);
      //   })
      //   .catch((err) => {
      //     localStorage.removeItem('access_token');
      //     refreshTokenRequest = null;
      //   });
      // // }
    }
    const status = error?.response?.status && `[${error.response.status}] `;
    if (error?.response?.data?.message) {
      return Promise.reject(status + error.response.data.message);
    }
    if (error?.response?.data?.error?.message) {
      return Promise.reject(status + error.response.data.error.message);
    }
    if (error?.response?.data?.error?.errors) {
      return Promise.reject(status + error.response.data.error.errors);
    }
    if (error?.response?.data?.error) {
      return Promise.reject(status + error.response.data.error);
    }
    return Promise.reject(error);
  }
);
export default axiosClient;
