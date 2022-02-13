import client from '../axiosClient';
import { UserWithoutPassword } from '../user/user.interface';

export interface LoginParameter {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expiredAt: string;
  user: UserWithoutPassword;
}

export const loginWithEmail = (data: LoginParameter) => {
  return client.request({
    method: 'POST',
    url: '/auth/login',
    withCredentials: true,
    data,
  }) as Promise<LoginResponse>;
};

export interface LogoutResponse {
  message: string;
}

export const logout = () => {
  return client.request({
    method: 'POST',
    url: '/auth/logout',
    withCredentials: true,
  }) as Promise<LogoutResponse>;
};
export type ProfileResponse = UserWithoutPassword;
export const getProfile = () => {
  return client.get('/auth/profile') as Promise<ProfileResponse>;
};

export interface RefreshTokenResponse {
  access_token: string;
  user: UserWithoutPassword;
}

export const refreshToken = () => {
  return client.request({
    method: 'POST',
    url: '/auth/refresh',
    withCredentials: true,
  }) as Promise<RefreshTokenResponse>;
};
