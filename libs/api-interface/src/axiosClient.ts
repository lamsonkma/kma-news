import axios from 'axios';
import qs from 'qs';
import { RefreshTokenResponse, refreshToken } from './auth';
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

export const ignorePath = ['/auth/login', '/auth/logout', '/auth/refresh'];
let refreshTokenRequest: Promise<RefreshTokenResponse> | null = null;
axiosClient.interceptors.response.use(
  (response) => {
    if (response?.data) return response.data;
    return response;
  },
  (error) => {
    if (
      error?.response?.status === 401 &&
      !ignorePath.includes(error.config.url)
    ) {
      // console.group('Refresh token');
      console.log('Token expired');
      if (ignorePath.includes(window.location.pathname)) {
        console.log('Skip refresh token');
      } else {
        console.log('Refresh token');
        refreshTokenRequest = refreshTokenRequest || refreshToken();
        return refreshTokenRequest
          .then((data) => {
            console.log('Refresh token success');
            localStorage.setItem('access_token', data.access_token);
            return axiosClient.request(error.config);
          })
          .catch((error) => {
            if (
              error?.response?.status === 401 ||
              error?.response?.status === 403
            ) {
              console.log('Refresh token failed');
              localStorage.removeItem('access_token');
            }
            refreshTokenRequest = null;
            throw error;
          });
      }
      // console.groupEnd();
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
